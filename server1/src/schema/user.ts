import * as z from "zod";

export const mediaSchema = z.discriminatedUnion(
  "type",
  [
    z.object({
      type: z.literal("url"),
      data: z
        .string({
          required_error: "data field is required",
          invalid_type_error: "data must be string",
        })
        .url("data must be url"),
    }),
    z.object({
      type: z.literal("base64"),
      data: z
        .string({
          required_error: "data field is required",
          invalid_type_error: "data must be string",
        })
        .regex(
          /^data:image\/(?:png|jpeg|jpg|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
          "Invalid data. Expect: base64"
        ),
    }),
  ],
  {
    errorMap: (issue, { defaultError }) => {
      return {
        message:
          issue.code == "invalid_union_discriminator"
            ? "type must be 'url' | 'base64'"
            : defaultError,
      };
    },
  }
);

export const setupMFASchema = z.object({
  body: z
    .object({
      deviceName: z
        .string({
          invalid_type_error: "deviceName must be string",
          required_error: "deviceName is required",
        })
        .max(128, "deviceName maximin 128 characters.")
        .regex(/^[\d\w+=,.@\-_][\d\w\s+=,.@\-_]*$/, "deviceName "),
    })
    .strict(),
});

export const enableMFASchema = z.object({
  body: z
    .object({
      mfa_code1: z
        .string({
          required_error:
            "Multi-factor authentication (MFA) code 1 is required",
          invalid_type_error:
            "Multi-factor authentication (MFA) code 1 must be string",
        })
        .length(6, "Invalid Multi-factor authentication (MFA) code 1"),
      mfa_code2: z
        .string({
          required_error:
            "Multi-factor authentication (MFA) code 2 is required",
          invalid_type_error:
            "Multi-factor authentication (MFA) code 2 must be string",
        })
        .length(6, "Invalid Multi-factor authentication (MFA) code 2"),
    })
    .strict(),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be string",
        })
        .optional(),
      newPassword: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be string",
        })
        .min(8, "Password is too short")
        .max(40, "Password can not be longer than 40 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
          "Password must include: letters, numbers and special characters"
        ),
      confirmNewPassword: z.string(),
    })
    .strict()
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Confirm new password don't match",
      path: ["confirmNewPassword"],
    })
    .refine(
      (data) => !data.oldPassword || data.oldPassword !== data.newPassword,
      {
        message: "The new password and old password must not be the same",
        path: ["confirmNewPassword"],
      }
    ),
});

export const changeEmailSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email("Invalid email"),
      otp: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .length(6, "Invalid otp"),
    })
    .strict(),
});

export const disconnectOauthProviderSchema = z.object({
  body: z
    .object({
      provider: z.enum(["google"]),
      providerId: z.string({
        invalid_type_error: "ProviderId must be string",
        required_error: "ProviderId must be required",
      }),
    })
    .strict(),
});

const editUserBody = z.object({
  photo: mediaSchema,
  coverPhoto: mediaSchema,
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be string",
    })
    .min(1, "First name can't be empty"),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be string",
    })
    .min(1, "Last name can't be empty"),
  birthDate: z
    .string({
      required_error: "birthDate is required",
      invalid_type_error: "birthDate must be string",
    })
    .date("invalid date"),
  bio: z
    .string({
      required_error: "bio is required",
      invalid_type_error: "bio must be string",
    })
    .max(256, "Must be 256 or fewer characters long"),
  urls: z.array(
    z.string({
      invalid_type_error: "id item must be string",
    }),
    {
      invalid_type_error: "id must be array",
    }
  ),
  phone: z.string({
    required_error: "phone is required",
    invalid_type_error: "phone must be string",
  }),
  address: z.string({
    required_error: "address is required",
    invalid_type_error: "address must be string",
  }),
});

export const editProfileSchema = z.object({
  body: editUserBody.partial().strip(),
});

export const createUserSchema = z.object({
  body: editUserBody.extend({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .min(8, "Password is too short")
      .max(40, "Password can not be longer than 40 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "Password must include: letters, numbers and special characters"
      ),
  }),
});

export type SetupMFAReq = z.infer<typeof setupMFASchema>;
export type EnableMFAReq = z.infer<typeof enableMFASchema>;
export type ChangePasswordReq = z.infer<typeof changePasswordSchema>;
export type ChangeEmailReq = z.infer<typeof changeEmailSchema>;
export type DisconnectOauthProviderReq = z.infer<
  typeof disconnectOauthProviderSchema
>;
export type editProfileReq = z.infer<typeof editProfileSchema>;

type Role = "Admin" | "Manager" | "Saler" | "Bloger" | "Customer";
type UserStatus = "Active" | "Suspended" | "Disabled";
export type User = {
  id: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  status: UserStatus;
  password: string | null;
  // hasPassword: boolean;
  mFAEnabled: boolean;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string | null;
    coverPhoto: string | null;
    phone: string;
    address: string;
    // postalCode: string;
    // country: string;
    // region: string;
    // city: string;
    bio: string;
    urls: string[];
  } | null;
  oauthProviders: {
    id: string;
    provider: string;
    providerId: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
