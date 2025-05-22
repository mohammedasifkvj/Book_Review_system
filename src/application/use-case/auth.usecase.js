import bcrypt from 'bcrypt';

import { createUser, findUserByEmail } from '../../infrastructure/repositories/user.repository.js';
import { generateTokens } from '../../application/services/auth.service.js';

export const signUp = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ name, email, password: hashedPassword });
  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid email or password');

  return generateTokens(user);
};