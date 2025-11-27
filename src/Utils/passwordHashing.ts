import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
