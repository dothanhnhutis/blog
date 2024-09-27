import { FetchHttp, FetchHttpError, IError, ISuccess } from "./http";
import { ResetPasswordInput, SignInInput } from "@/schemas/auth";
import {
  CreateUserInput,
  EditPasswordInput,
  EditPictureInput,
  EditProfileInput,
  EditUserInput,
  SearchUserInput,
  SearchUserRes,
  User,
} from "@/schemas/user";

class UserService extends FetchHttp {
  constructor() {
    super("/api/v1/users");
  }

  async editProfile(cookie: string, input: EditProfileInput) {
    try {
      return await this.patch<{ message: string }>("", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editProfile() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async editPicture(cookie: string, input: EditPictureInput) {
    try {
      return await this.post<{ message: string }>("/picture", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editProfile() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async currentUser(cookie: string) {
    try {
      return await this.get<User>("/me", {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService currentUser() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async sendEmailVerify(cookie: string) {
    try {
      return await this.get<{ message: string }>("/resend-email", {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService sendEmailVerify() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async changeEmail(cookie: string, input: Pick<SignInInput, "email">) {
    try {
      return await this.patch<{ message: string }>("/change-email", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService changeEmail() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async resetPassword(token: string, input: ResetPasswordInput) {
    try {
      return await this.patch<{ message: string }>(
        "/auth/reset-password/" + token,
        input
      );
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService resetPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async disactivateAccount(cookie: string) {
    try {
      return await this.patch<{ message: string }>(
        "/disactivate",
        {},
        {
          headers: {
            Cookie: cookie,
          },
        }
      );
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService disactivateAccount() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async editPassword(cookie: string, input: EditPasswordInput) {
    try {
      return await this.post<{ message: string }>("/change-password", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async createPassword(
    cookie: string,
    input: Omit<EditPasswordInput, "oldPassword">
  ) {
    try {
      return await this.post<{ message: string }>("/password", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService createPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async searchUser(cookie: string, props?: SearchUserInput) {
    let searchParams = "";
    if (props) {
      searchParams =
        "?" +
        Object.entries(props)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}=${value.join(",")}`;
            } else {
              return `${key}=${value}`;
            }
          })
          .join("&");
    }
    try {
      const res = await this.get<{
        users: SearchUserRes[];
        metadata: {
          hasNextPage: boolean;
          totalPage: number;
          totalItem: number;
        };
      }>(`/_search${searchParams}`, {
        headers: {
          Cookie: cookie,
        },
      });
      return res;
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService searchUser() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async createUser(cookie: string, input: CreateUserInput) {
    try {
      return await this.post<{ message: string }>("", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService createUser() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async getUserById(cookie: string, id: string) {
    try {
      return await this.get<User>("/" + id, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService getUserById() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async editUserById(cookie: string, id: string, input: EditUserInput) {
    try {
      return await this.patch<{ message: string }>(`/${id}`, input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editUserById() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async signOut(cookie: string) {
    try {
      return await this.delete<{ message: string }>("/auth/signout", {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService signOut() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async setupMFA(cookie: string, deviceName: string) {
    try {
      return await this.post<{
        message: string;
        data: {
          backupCodes: string[];
          totp: {
            ascii: string;
            hex: string;
            base32: string;
            oauth_url: string;
          };
          qrCodeUrl: string;
        };
      }>(
        "/mfa/setup",
        {
          deviceName,
        },
        {
          headers: {
            Cookie: cookie,
          },
        }
      );
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService setupMFA() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
  async enableMFA(
    cookie: string,
    input: { mfa_code1: string; mfa_code2: string }
  ) {
    try {
      return await this.post<{
        message: string;
        data: {
          backupCodes: string[];
          totp: {
            ascii: string;
            hex: string;
            base32: string;
            oauth_url: string;
          };
        };
      }>("/mfa/enable", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService enableMFA() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
  async disableMFA(
    cookie: string,
    input: { mfa_code1: string; mfa_code2: string }
  ) {
    try {
      return await this.post<{
        message: string;
      }>("/mfa/disable", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService disableMFA() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
  async disconnectOauthProvider(
    cookie: string,
    input: {
      provider: string;
      providerId: string;
    }
  ) {
    try {
      return await this.post<{
        message: string;
      }>("/disconnect", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log(
          "UserService disconnectOauthProvider() method error: ",
          error
        );
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}
export default new UserService();
