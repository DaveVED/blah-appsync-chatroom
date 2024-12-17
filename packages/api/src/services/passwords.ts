import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword: string): Promise<string> => {
  /**
   * determines how many iterations or rounds of processing the hashing algorithm
   * will go through to generate the final hashed password. Each additional round
   * makes the hashing process slower and computationally more expensive,
   * which enhances security by making brute-force attacks more difficult.
   */
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
