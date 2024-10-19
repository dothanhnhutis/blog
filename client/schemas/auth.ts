import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email là bắt buộc",
      invalid_type_error: "Email phải là chuỗi",
    })
    .email("Email không hợp lệ"),
  password: z.string({
    required_error: "Password là bắt buộc",
    invalid_type_error: "Password phải là chuỗi",
  }),
});
export const signInWithMFASchema = z.object({
  sessionId: z.string({
    required_error: "Mã MFA không hợp lệ",
    invalid_type_error: "Mã MFA không hợp lệ",
  }),
  code: z
    .string({
      required_error: "Mã MFA không hợp lệ",
      invalid_type_error: "Mã MFA không hợp lệ",
    })
    .length(6, "Mã MFA không hợp lệ"),
});

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "Email field is required",
        invalid_type_error: "Email field must be string",
      })
      .email("Email không hợp lệ"),
    password: z
      .string({
        required_error: "Password field is required",
        invalid_type_error: "Password field must be string",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(40, "Password can not be longer than 40 characters")
      .superRefine((val, ctx) => {
        const regex: RegExp =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
        if (!regex.test(val)) {
          ctx.addIssue({
            code: "custom",
            path: ["password", "format"],
            message:
              "Password must include: letters, numbers and special characters",
          });
        }
      }),
    confirmPassword: z.string({
      required_error: "confirmPassword is required",
      invalid_type_error: "confirmPassword must be string",
    }),
  })
  .strict()
  .refine((data) => data.confirmPassword == data.password, {
    message: "Xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    session: z.string({
      required_error: "Session is required",
      invalid_type_error: "Session must be string",
    }),
    password: z
      .string({
        required_error: "Password field is required",
        invalid_type_error: "Password field must be string",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(40, "Password can not be longer than 40 characters")
      .superRefine((val, ctx) => {
        const regex: RegExp =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
        if (!regex.test(val)) {
          ctx.addIssue({
            code: "custom",
            path: ["password", "format"],
            message:
              "Password must include: letters, numbers and special characters",
          });
        }
      }),
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password don't match",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignInWithMFAInput = z.infer<typeof signInWithMFASchema>;

export type SignUpInput = z.infer<typeof signUpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
