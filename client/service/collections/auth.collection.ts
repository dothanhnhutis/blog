import { ResetPasswordInput, SignInInput, SignUpInput } from "@/schemas/auth";
import {
  FetchHttp,
  FetchHttpError,
  FetchHttpOption,
  IError,
  ISuccess,
} from "./http";

class AuthService extends FetchHttp {
  constructor() {
    super("/api/v1/auth");
  }

  async signIn(
    input: SignInInput | Pick<SignInInput, "email">,
    options?: FetchHttpOption
  ) {
    try {
      return await this.post<{ message: string }>("/signin", input, options);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService signUp() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async reActivateAccount(email: string) {
    try {
      return await this.post<{ message: string }>("/reactivate", {
        email,
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService signUp() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async signUp(input: SignUpInput) {
    try {
      const res = await this.post<{ message: string }>("/signup", input);
      return res;
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService signUp() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async resetPassword(input: ResetPasswordInput) {
    try {
      return await this.patch<{ message: string }>("/reset-password", input);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService resetPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async recover(email: string) {
    try {
      return await this.patch<{ message: string }>("/recover", {
        email,
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService recover() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async activateAccount(token: string) {
    try {
      return await this.get<{ message: string }>("/reactivate/" + token);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService activateAccount() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async verifyEmail(token: string): Promise<void | IError> {
    try {
      await this.get<{ message: string }>(`/confirm-email/${token}`);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService verifyEmail() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async getSession(token: string) {
    try {
      return await this.get<{
        type: "emailVerification" | "recoverAccount" | "reActivate";
        session: string;
      }>("?token=" + token);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService getSession() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}

export default new AuthService();
