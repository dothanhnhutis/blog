import { User } from "./schemas/user";

export const EMAIL_VERIFY_ROUTE: string = "/verify-email";
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/settings/profile";
export const DEFAULT_LOGOUT_REDIRECT: string = "/login";

export const authRoutes: RegExp = /^\/(login|signup|send-email|recover)?$/;
const BaseRoutes: RegExp =
  /^\/account\/(profile|settings|password-and-security)$/;
const PostRoutes: RegExp = /^\/manager\/posts(\/create|.+\/edit)?$/;
const ProductRoutes: RegExp = /^\/manager\/products(\/create|.+\/edit)?$/;
const UsersRoutes: RegExp = /^\/manager\/users(\/create|.+\/edit)?$/;

export const privateRegExpRoutes = [
  BaseRoutes,
  PostRoutes,
  ProductRoutes,
  UsersRoutes,
  /^\/manager$/,
];

export const roleAccessRoutes: Record<User["role"], RegExp[]> = {
  Customer: [BaseRoutes],
  Bloger: [BaseRoutes, PostRoutes],
  Saler: [],
  Manager: [BaseRoutes, PostRoutes, ProductRoutes],
  Admin: privateRegExpRoutes,
};
