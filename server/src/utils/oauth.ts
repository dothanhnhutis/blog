import configs from "@/configs";
import { google } from "googleapis";

const facebookOAuth2 = ({ ...rest }: FacebookConfigs) => {
  return {
    getUrl: (opts?: FacebookOptions | undefined) => {
      const newOtp: FacebookConfigs = {
        ...rest,
        ...opts,
      };

      let url = "https://www.facebook.com/v21.0/dialog/oauth?";

      for (const key of Object.keys(newOtp)) {
        if (key == "client_secret") continue;
        if (key == "scope") {
          url =
            url.endsWith("&") || url.endsWith("?")
              ? url + `${key}=${newOtp[key]?.join(",")}`
              : url + "&" + `${key}=${newOtp[key]?.join(",")}`;
        } else {
          console.log(url);
          url =
            url.endsWith("&") || url.endsWith("?")
              ? url + `${key}=${newOtp[key as keyof typeof newOtp]}`
              : url + "&" + `${key}=${newOtp[key as keyof typeof newOtp]}`;
        }
      }
      return url;
    },
    getProfile: async (code: string, opts?: FacebookOptions) => {
      const newOtp: FacebookConfigs = {
        ...rest,
        ...opts,
      };

      const { access_token } = await fetch(
        "https://graph.facebook.com/v21.0/oauth/access_token?" +
          `client_id=${newOtp.client_id}&redirect_uri=${
            newOtp?.redirect_uri || ""
          }&client_secret=${newOtp.client_secret}&code=${code}`
      )
        .then(async (res) => await res.json())
        .then(
          (data) =>
            data as {
              access_token: string;
              token_type: string;
              expires_in: number;
              auth_type?: string;
            }
        );

      const userInfoUrl = `https://graph.facebook.com/me?fields=email,first_name,last_name,name,picture.height(720).width(720).redirect(false)&access_token=${access_token}`;
      const data = await fetch(userInfoUrl)
        .then(async (res) => await res.json())
        .then((data) => data as FacebookUserInfo);

      return data;
    },
  };
};

const GOOGLE_REDIRECT_URI = `${configs.SERVER_URL}/api/v1/auth/google/callback`;
const googleOAuth2Client = new google.auth.OAuth2(
  configs.GOOGLE_CLIENT_ID,
  configs.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

const FACEBOOK_REDIRECT_URI = `${configs.SERVER_URL}/api/v1/auth/facebook/callback`;
const facebookOAuth2Client = facebookOAuth2({
  client_id: configs.FACEBOOK_CLIENT_ID,
  client_secret: configs.FACEBOOK_CLIENT_SECRET,
  redirect_uri: FACEBOOK_REDIRECT_URI,
  scope: ["public_profile", "email"],
});

export type GoogleUserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

interface FacebookOptions {
  redirect_uri?: string | undefined;
  state?: string | undefined;
  scope?: string[] | undefined;
}

interface FacebookConfigs extends FacebookOptions {
  client_id: string;
  client_secret: string;
}

export type FacebookUserInfo = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  picture: {
    data: {
      height: number;
      width: number;
      is_silhouette: boolean;
      url: string;
    };
  };
};

type Provider = "google" | "facebook";

type GenerateUrlProviderProps = {
  google: {
    prompt?: string | undefined;
    state?: string | undefined;
    redirect_uri?: string | undefined;
    access_type?: string | undefined;
    scope?: string | string[] | undefined;
  };
  facebook: {
    redirect_uri?: string | undefined;
    state?: string | undefined;
    scope?: string[] | undefined;
  };
};

export const generateUrlOauth2 = <P extends Provider>(
  provider: P,
  props?: GenerateUrlProviderProps[P]
): string => {
  switch (provider) {
    case "google":
      return googleOAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "openid",
        ],
        prompt: "consent",
        ...(props as GenerateUrlProviderProps["google"]),
      });
    case "facebook":
      return facebookOAuth2Client.getUrl(
        props as GenerateUrlProviderProps["facebook"]
      );
    default:
      throw new Error("Invalid provider argument. expect 'google' | 'facebook");
  }
};

export type UserProfile = {
  provider: string;
  providerId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
};

type GetUserProfileProps = {
  google: {
    codeVerifier?: string | undefined;
    client_id?: string | undefined;
    redirect_uri?: string | undefined;
  };
  facebook: {
    redirect_uri?: string | undefined;
  };
};

export const getUserProfile = async <P extends Provider>(
  provider: P,
  code: string,
  config?: GetUserProfileProps[P]
): Promise<UserProfile> => {
  let profile: UserProfile;

  switch (provider) {
    case "facebook":
      const facebookInfo = await facebookOAuth2Client.getProfile(
        code,
        config as GetUserProfileProps["facebook"]
      );
      console.log(facebookInfo);
      profile = {
        provider: "facebook",
        providerId: facebookInfo.id,
        email: facebookInfo.email,
        firstName: facebookInfo.first_name,
        lastName: facebookInfo.last_name,
        picture: facebookInfo.picture.data.url,
      };
      break;
    case "google":
      const { tokens } = await googleOAuth2Client.getToken({
        code,
        ...(config as GetUserProfileProps["google"]),
      });
      googleOAuth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: googleOAuth2Client,
        version: "v2",
      });

      const googleInfo = (await oauth2.userinfo.get()).data as GoogleUserInfo;
      profile = {
        provider: "google",
        providerId: googleInfo.id,
        email: googleInfo.email,
        firstName: googleInfo.given_name,
        lastName: googleInfo.family_name,
        picture: googleInfo.picture,
      };
      break;

    default:
      throw new Error("Invalid provider argument. expect 'google' | 'facebook");
  }
  return profile;
};
