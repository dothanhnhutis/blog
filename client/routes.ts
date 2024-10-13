import { User } from "./schemas/user";

export const EMAIL_VERIFY_ROUTE: string = "/verify-email";
export const COMPLETE_PROFILE_ROUTE: string = "/complete-profile";

export const apiAuthPrefix: string = "/api";
export const DEFAULT_LOGIN_REDIRECT: string = "/profile";
export const DEFAULT_LOGOUT_REDIRECT: string = "/login";

export const authRoutes: RegExp = /^\/(login|signup|send-email|recover)?$/;
const BaseRoutes: RegExp = /^\/(profile|security|sessions)$/;
const PostRoutes: RegExp = /^\/manager\/posts(\/create|.+\/edit)?$/;
const ProductRoutes: RegExp = /^\/manager\/products(\/create|.+\/edit)?$/;
const UsersRoutes: RegExp = /^\/manager\/users(\/create|.+\/edit)?$/;
export const middleRegExpRoutes = /^\/(verify-email|complete-profile)$/;

export const privateRegExpRoutes = [
  BaseRoutes,
  PostRoutes,
  ProductRoutes,
  UsersRoutes,
  middleRegExpRoutes,
  /^\/manager$/,
];

export const roleAccessRoutes: Record<User["role"], RegExp[]> = {
  CUSTOMER: [BaseRoutes],
  BUSINESS_PARTNER: [BaseRoutes, PostRoutes],
  ADMIN: [BaseRoutes, PostRoutes, ProductRoutes],
  SUPER_ADMIN: privateRegExpRoutes,
};
