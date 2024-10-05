import { error } from "console";
import z from "zod";

export const signinSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "email is required1]",
          invalid_type_error: "email must be string",
        })
        .email("invalid email or password"),
      password: z
        .string({
          required_error: "password is required",
          invalid_type_error: "password must be string",
        })
        .min(8, "invalid email or password")
        .max(40, "invalid email or password"),
      mfa_code: z
        .string({
          required_error: "MFA code is required",
          invalid_type_error: "MFA code must be string",
        })
        .length(6, "invalid MFA code")
        .optional(),
    })
    .strict(),
});

export const signupSchema = z.object({
  body: z
    .object({
      firstName: z
        .string({
          required_error: "firstName is required",
          invalid_type_error: "firstName must be string",
        })
        .min(1, "firstName can't be empty"),
      lastName: z
        .string({
          required_error: "lastName is required",
          invalid_type_error: "lastName must be string",
        })
        .min(1, "lastName can't be empty"),
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
      // otp: z
      //   .string({
      //     required_error: "otp is required",
      //     invalid_type_error: "otp must be string",
      //   })
      //   .length(6, "Invalid otp code"),
    })
    .strict(),
});

export const sendVerificationEmailSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email("Invalid email address"),
    })
    .strict(),
});

export const recoverAccountSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email("Invalid email address"),
    })
    .strict(),
});

export const resetPasswordSchema = z.object({
  params: z.object({ token: z.string() }),
  body: z
    .object({
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
      confirmPassword: z.string(),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export const sendReActivateAccountSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email("Invalid email address"),
    })
    .strict(),
});

export const signInWithGoogleCallBackQuery = z.union([
  z.object({
    state: z.string(),
    error: z.string(),
  }),
  z.object({
    state: z.string(),
    code: z.string(),
    scope: z.string(),
    authuser: z.string(),
    prompt: z.string(),
  }),
]);

export type SignInReq = z.infer<typeof signinSchema>;
export type SignUpReq = z.infer<typeof signupSchema>;
export type SendVerificationEmailReq = z.infer<
  typeof sendVerificationEmailSchema
>;
export type RecoverAccountReq = z.infer<typeof recoverAccountSchema>;
export type ResetPasswordReq = z.infer<typeof resetPasswordSchema>;
export type SendReActivateAccountReq = z.infer<
  typeof sendReActivateAccountSchema
>;
