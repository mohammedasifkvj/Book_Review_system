import { signupService, loginService } from '../../application/services/auth.service.js';

export const signupController = async (req, res) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await loginService(req.body);
    console.log(accessToken,refreshToken)

    // Set refresh token in httpOnly cookie
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      })
      .status(200)
      .json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};