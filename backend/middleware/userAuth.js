import crypto from "crypto";
import jwt from "jsonwebtoken";

// INFO: Verifies Clerk session tokens (sent as "Authorization: Bearer <token>")
// using Clerk's public JWKS. Only the publishable key is required; the
// Clerk Frontend API host is encoded inside it.
const getJwksUrl = () => {
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY?.trim();
  if (!publishableKey?.startsWith("pk_")) {
    throw new Error("CLERK_PUBLISHABLE_KEY is missing or invalid");
  }

  const encodedHost = publishableKey.split("_").slice(2).join("_");
  const frontendApi = Buffer.from(encodedHost, "base64")
    .toString("utf8")
    .replace(/\$$/, "");

  return `https://${frontendApi}/.well-known/jwks.json`;
};

let cachedKeys = {};

const getSigningKey = async (kid) => {
  if (cachedKeys[kid]) return cachedKeys[kid];

  const response = await fetch(getJwksUrl());
  if (!response.ok) throw new Error("Unable to fetch Clerk signing keys");

  const { keys } = await response.json();
  cachedKeys = Object.fromEntries(
    keys.map((jwk) => [jwk.kid, crypto.createPublicKey({ key: jwk, format: "jwk" })])
  );

  if (!cachedKeys[kid]) throw new Error("Unknown signing key");
  return cachedKeys[kid];
};

const userAuth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Please sign in to continue." });
  }

  try {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded?.header?.kid) throw new Error("Malformed token");

    const key = await getSigningKey(decoded.header.kid);
    const payload = jwt.verify(token, key, {
      algorithms: ["RS256"],
      clockTolerance: 5,
    });

    req.userId = payload.sub;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Session expired. Please sign in again." });
  }
};

export default userAuth;
