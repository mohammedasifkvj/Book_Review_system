import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../domain/models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/token.utils.js';

export const signupService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return { message: 'Signup successful' };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('You are not a registerd user');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = generateRefreshToken(user._id);

  return { accessToken, refreshToken };
};

export const generateTokens = async (user) => {
  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);
  return { accessToken, refreshToken };
};