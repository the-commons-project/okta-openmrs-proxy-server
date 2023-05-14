import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1d" });
};

export const decodeToken = (token) => {
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const okta_public_key =
    "-----BEGIN PUBLIC KEY-----\n9Wvv99iAz2Pe20kZSC7z20H52o10Qq2Xn8Yxa8C0uOts8DYY_-UquIm_VbLWMLSFI3gs6BJWK8bqs18qb3zmudk0I39Iwpga9qZVIMm9RPdnYoBYhQdJznk8CCJE0WLhgEnZqeP-44rcr8siW1UjQo1zB00kYTKFGU3-KSrxOTxmQ-k-MesFFfnC7gqVMg5AHBg2CtyyaLgyjQlF9LihqKZS4cR9uQkDH8B_X9M1iMld9FyhHWHa2hl6fufnVHWo7KMbaXTrBZh0a6Zz9Jvy8gZl3Ov6aoPKGfFMLLf33iGYw0De2e0NcWJek3bXf3K4JmGK2l6B99McwbqQR6xlVQ\n-----END PUBLIC KEY-----";

  return jwt.decode(
    token,
    okta_public_key,
    { algorithms: ["RS256"] }
    // { audience: "api://default" }
  );
};
