import bcrypt from "bcrypt";

export const hashPassword = async (password, salt) => {
  const saltRounds = await bcrypt.genSalt(salt);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
