import { query } from "express";
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

export const sendChangeEmailSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email("Invalid email"),
    })
    .strict(),
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

const editUserBody = z.object({
  picture: z
    .string({
      required_error: "Picture is required",
      invalid_type_error: "Picture must be string",
    })
    .min(1, "Picture can't be empty")
    .nullable(),
  fullName: z
    .string({
      required_error: "fullName is required",
      invalid_type_error: "fullName must be string",
    })
    .min(1, "fullName can't be empty"),
  phoneNumber: z
    .string({
      required_error: "phone is required",
      invalid_type_error: "phone must be string",
    })
    .length(10, "Invalid phone number. Expect 10 numbers"),
});

export const createUserSchema = z.object({
  body: editUserBody.partial({ picture: true, phoneNumber: true }).extend({
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
    role: z.enum(["ADMIN", "BUSINESS_PARTNER", "CUSTOMER"]),
  }),
});

export const editUserSchema = z.object({
  params: z
    .object({
      userId: z.string(),
    })
    .strip(),
  body: createUserSchema.shape.body
    .strip()
    .extend({
      status: z.enum(["ACTIVE", "SUSPENDED", "DISABLED"]),
    })
    .partial(),
});

export const filterUserBodySchema = z
  .object({
    ids: z
      .array(z.string({ invalid_type_error: "id item must be string" }))
      .nonempty("ids can not empty"),
    emails: z
      .array(z.string({ invalid_type_error: "" }).email("invalid email"))
      .nonempty("emails can not empty"),
    email_verified: z.boolean({
      invalid_type_error: "emailVerified must be boolean",
    }),
    fullName: z.string({
      invalid_type_error: "fullName must be string.",
    }),
    roles: z
      .array(z.enum(["ADMIN", "BUSINESS_PARTNER", "CUSTOMER"]))
      .nonempty("roles can not empty"),
    statuses: z
      .array(z.enum(["ACTIVE", "SUSPENDED", "DISABLED"]))
      .nonempty("statuses can not empty"),
    created_range: z
      .array(
        z
          .string({ invalid_type_error: "createRange[item] must be date" })
          .datetime("createRange[item] invalid datetime")
      )
      .length(2, "createRange expect 2 item")
      .refine((data) => new Date(data[0]) <= new Date(data[1]), {
        message:
          "The element at position 0 must be less than or equal to the element at position 1",
        path: ["create_range"],
      }),
    order_by: z
      .array(
        z
          .object({
            email: z.enum(["asc", "desc"], {
              message: "orderBy email must be enum 'asc'|'desc'",
            }),
            firstName: z.enum(["asc", "desc"], {
              message: "orderBy firstName must be enum 'asc'|'desc'",
            }),
            lastName: z.enum(["asc", "desc"], {
              message: "orderBy lastName must be enum 'asc'|'desc'",
            }),
            role: z.enum(["asc", "desc"], {
              message: "orderBy role must be enum 'asc'|'desc'",
            }),
            emailVerified: z.enum(["asc", "desc"], {
              message: "orderBy emailVerified must be enum 'asc'|'desc'",
            }),
            status: z.enum(["asc", "desc"], {
              message: "orderBy status must be enum 'asc'|'desc'",
            }),
            createdAt: z.enum(["asc", "desc"], {
              message: "orderBy createdAt must be enum 'asc'|'desc'",
            }),
            updatedAt: z.enum(["asc", "desc"], {
              message: "orderBy updatedAt must be enum 'asc'|'desc'",
            }),
          })
          .strip()
          .partial()
          .refine(
            (data) => {
              const keys = Object.keys(data);
              return keys.length === 1;
            },
            {
              message:
                "Each object must have exactly one key, either 'firstName'|'lastName'|'email'|'role'|'emailVerified'|'status'|'createdAt'|'updatedAt'",
            }
          )
      )
      .nonempty("order_by can not empty"),
    limit: z
      .number({ invalid_type_error: "limit must be number" })
      .int("limit must be interger")
      .gte(1, "limit must be greater than 1"),
    page: z
      .number({ invalid_type_error: "page must be number" })
      .int("page must be interger")
      .gte(1, "page must be greater than 1"),
  })
  .strip()
  .partial();
export const filterUserQuerySchema = z
  .object({
    id: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (Array.isArray(val) ? val : [val])),
    email: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .array(z.string().email())
            .safeParse(Array.isArray(val) ? val : [val]).data
      ),
    email_verified: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .enum(["0", "1", "true", "false"])
            .safeParse(Array.isArray(val) ? val.pop() : val).data
      ),
    full_name: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (Array.isArray(val) ? val.pop() : val)),
    role: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .array(z.enum(["ADMIN", "BUSINESS_PARTNER", "CUSTOMER"]))
            .safeParse(Array.isArray(val) ? val : [val]).data
      ),
    status: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .array(z.enum(["ACTIVE", "SUSPENDED", "DISABLED"]))
            .safeParse(Array.isArray(val) ? val : [val]).data
      ),
    created_from: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .datetime()
          .safeParse(Array.isArray(val) ? val.pop() : val).data
    ),
    created_to: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .datetime()
          .safeParse(Array.isArray(val) ? val.pop() : val).data
    ),
    order_by: z.union([z.string(), z.array(z.string())]).transform((val) => {
      const userOrderByRegex =
        /^((email|firstName|lastName|role|emailVerified|status|createdAt|updatedAt)_(asc|desc)\,)*?(email|firstName|lastName|role|emailVerified|status|createdAt|updatedAt)_(asc|desc)$/;
      if (Array.isArray(val)) {
        return userOrderByRegex.test(val.join(",")) ? val.join(",") : undefined;
      } else {
        return userOrderByRegex.test(val) ? val : undefined;
      }
    }),
    limit: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .regex(/^\d+$/)
          .safeParse(Array.isArray(val) ? val.pop() : val).data
    ),
    page: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .regex(/^\d+$/)
          .safeParse(Array.isArray(val) ? val.pop() : val).data
    ),
  })
  .strip()
  .partial()
  .transform((val) => {
    const result: any = {};
    if (val.id && val.id.length > 0) {
      result.ids = val.id;
    }
    if (val.email && val.email.length > 0) {
      result.emails = val.email;
    }
    if (val.email_verified) {
      result.email_verified =
        val.email_verified == "1" || val.email_verified == "true";
    }
    if (val.full_name) {
      result.fullName = val.full_name;
    }
    if (val.status) {
      result.statuses = val.status;
    }
    if (val.role) {
      result.roles = val.role;
    }
    if (
      val.created_from &&
      val.created_to &&
      new Date(val.created_from) <= new Date(val.created_to)
    ) {
      result.created_range = [val.created_from, val.created_to];
    }
    if (val.order_by) {
      result.order_by = val.order_by
        .split(",")
        .map((o) => ({ [o.split("_")[0]]: o.split("_")[1] }));
    }

    if (val.limit) {
      result.limit = parseInt(val.limit);
    }
    if (val.page) {
      result.page = parseInt(val.page);
    }
    return result;
  })
  .pipe(filterUserBodySchema);

export const filterUserSchema = z.object({
  query: filterUserQuerySchema,
  body: filterUserBodySchema,
});

export type SetupMFAReq = z.infer<typeof setupMFASchema>;
export type EnableMFAReq = z.infer<typeof enableMFASchema>;
export type ChangePasswordReq = z.infer<typeof changePasswordSchema>;
export type SendChangeEmailReq = z.infer<typeof sendChangeEmailSchema>;
export type ChangeEmailReq = z.infer<typeof changeEmailSchema>;
export type EditUserReq = z.infer<typeof editUserSchema>;
export type CreateUserReq = z.infer<typeof createUserSchema>;
export type FilterUserReq = z.infer<typeof filterUserSchema>;

type Role = "SUPER_ADMIN" | "ADMIN" | "BUSINESS_PARTNER" | "CUSTOMER";
type UserStatus = "ACTIVE" | "SUSPENDED" | "DISABLED";

export type User = {
  id: string;
  email: string | null;
  emailVerified: boolean;
  // emailVerificationExpires: Date | null;
  // emailVerificationToken: string | null;
  role: Role;
  status: UserStatus;
  password: string | null;
  // passwordResetToken: string | null;
  // passwordResetExpires: Date | null;
  // reActiveToken: string | null;
  // reActiveExpires: Date | null;
  fullName: string | null;
  birthDate: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  picture: string | null;
  phoneNumber: string | null;
  mfa: {
    secretKey: string;
    lastAccess: Date;
    backupCodes: string[];
    backupCodesUsed: string[];
    createdAt: Date;
    updatedAt: Date;
  } | null;
  // oauthProviders: {
  //   provider: string;
  //   providerId: string;
  // }[];
  createdAt: Date;
  updatedAt: Date;
};
