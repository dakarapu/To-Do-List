import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (pwd) => {
  try {
    const hashedPassword = await bcrypt.hash(pwd, 10);
    return hashedPassword;
  } catch (e) {
    return e;
  }
};

export const validPassword = async (pwd, hash) => {
  try {
    const validity = await bcrypt.compare(pwd, hash);
    return validity;
  } catch (e) {
    return e;
  }
};

export const generateToken = (username, empId) => {
  const token = jwt.sign({ username, empId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
