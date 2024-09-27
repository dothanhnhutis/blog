export type Role = "MANAGER" | "SALER" | "BLOGER" | "CUSTOMER" | "ADMIN";
export class User {
  private _id: string;
  private _email: string;
  private _emailVerified: boolean;
  private _emailVerificationExpires?: Date | null;
  private _emailVerificationToken?: string | null;
  private _username: string;
  private _picture: string | null;
  private _password?: string;
  private _passwordResetToken?: string | null;
  private _passwordResetExpires?: Date | null;
  private _role: Role;
  private _suspended: boolean;
  private _inActive: boolean;
  private _reActiveToken?: string | null;
  private _reActiveExpires?: Date | null;
  private _phone?: string | null;
  private _address?: string | null;
  //   private _createdAt: Date;
  //   private _updatedAt: Date;
  constructor({
    id,
    email,
    emailVerified,
    emailVerificationExpires,
    emailVerificationToken,
    username,
    picture,
    password,
    passwordResetToken,
    passwordResetExpires,
    role,
    suspended,
    disabled,
    reActiveToken,
    reActiveExpires,
    phone,
    address,
  }: {
    id: string;
    email: string;
    emailVerified: boolean;
    emailVerificationExpires?: Date | null;
    emailVerificationToken?: string | null;
    username: string;
    picture: string | null;
    password?: string;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | null;
    role: Role;
    suspended: boolean;
    disabled: boolean;
    reActiveToken?: string | null;
    reActiveExpires?: Date | null;
    phone?: string | null;
    address?: string | null;
  }) {
    this._id = id;
    this._email = email;
    this._emailVerified = emailVerified;
    this._emailVerificationExpires = emailVerificationExpires;
    this._emailVerificationToken = emailVerificationToken;
    this._username = username;
    this._picture = picture;
    this._password = password;
    this._passwordResetToken = passwordResetToken;
    this._passwordResetExpires = passwordResetExpires;
    this._role = role;
    this._suspended = suspended;
    this._inActive = disabled;
    this._reActiveToken = reActiveToken;
    this._reActiveExpires = reActiveExpires;
    this._phone = phone;
    this._address = address;
  }

  public get id(): string {
    return this._id;
  }
}
