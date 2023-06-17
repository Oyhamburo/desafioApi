import bcrypt from "bcryptjs";
const SALT_WORK_FACTOR = 5;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Error hashing password");
  }
};

const comparePassword = async (password, validPassword) => {
  const valid = await bcrypt.compare(password, validPassword);
  return valid;
};

export { hashPassword, comparePassword };
