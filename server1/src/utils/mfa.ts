import otpauth from "otpauth";

export type TOTPType = {
  ascii: string;
  hex: string;
  base32: string;
  oauth_url: string;
};

export function generateMFA(label: string, secretKey?: string): TOTPType {
  const secret = secretKey
    ? otpauth.Secret.fromBase32(secretKey)
    : new otpauth.Secret({ size: 20 });
  const totp = new otpauth.TOTP({
    issuer: "I.C.H Web Service",
    label: label,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret,
  });
  return {
    ascii: secret.latin1,
    hex: secret.hex,
    base32: secret.base32,
    oauth_url: totp.toString(),
  };
}

export function validateMFA({
  secret,
  token,
}: {
  secret: string;
  token: string;
}) {
  const totp = new otpauth.TOTP({
    secret,
  });
  return totp.validate({ token });
}
