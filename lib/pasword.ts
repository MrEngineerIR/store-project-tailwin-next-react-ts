import crypto from "node:crypto";

const hashPassword = async (pass: string) => {
  return await crypto.createHash("sha256").update(pass).digest("hex");
};

const verifyPassword = async (pass: string, hashedPass: string) => {
  const newHash = await hashPassword(pass);
  const isValid = newHash === hashedPass;
  return isValid;
};

export { verifyPassword };
export default hashPassword;
