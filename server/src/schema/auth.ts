import z from "zod";

export const signInSchema = z.object({
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
    })
    .strict(),
});

export const signInWithMFASchema = z.object({
  body: z
    .object({
      sessionId: z.string({
        required_error: "sessionId is required",
        invalid_type_error: "sessionId must be string",
      }),
      code: z
        .string({
          required_error: "code is required",
          invalid_type_error: "code must be string",
        })
        .length(6, "invalid code"),
    })
    .strict(),
});

export const signupSchema = z.object({
  body: z
    .object({
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
      confirmPassword: z.string({
        required_error: "confirmPassword is required",
        invalid_type_error: "confirmPassword must be string",
      }),
    })
    .strict()
    .refine((data) => data.confirmPassword == data.password, {
      message: "confirmPassword does not match password",
      path: ["confirmPassword"],
    }),
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

export const signInWithProviderCallbackSchema = z.object({
  query: z.union([
    z
      .object({
        state: z.string(),
        code: z.string(),
        scope: z.string(),
        authuser: z.string(),
        prompt: z.string(),
      })
      .strip(),
    z
      .object({
        error: z.string(),
        state: z.string(),
      })
      .strip(),
    z
      .object({
        state: z.string(),
        code: z.string(),
      })
      .strip(),
    z
      .object({
        state: z.string(),
        error_reason: z.string(),
        error: z.string(),
        error_description: z.string(),
      })
      .strip(),
  ]),
});

export type SignInReq = z.infer<typeof signInSchema>;
export type SignInWithMFAReq = z.infer<typeof signInWithMFASchema>;
export type SignUpReq = z.infer<typeof signupSchema>;
export type SendVerificationEmailReq = z.infer<
  typeof sendVerificationEmailSchema
>;
export type RecoverAccountReq = z.infer<typeof recoverAccountSchema>;
export type ResetPasswordReq = z.infer<typeof resetPasswordSchema>;
export type SendReActivateAccountReq = z.infer<
  typeof sendReActivateAccountSchema
>;

export type SignInWithProviderCallbackReq = z.infer<
  typeof signInWithProviderCallbackSchema
>;
