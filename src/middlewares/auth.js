import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import util from 'util';

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

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authentication;
    if (!token) return res.status(401).send(`Unauthorized request, please login.`);

    const jwtVerify = util.promisify(jwt.verify);
    const verifiedUser = await jwtVerify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
  } catch (e) {
    return res.status(403).send(`Invalid token.`);
  }
  next();
};
