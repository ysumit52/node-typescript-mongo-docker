import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { relogRequestHandler } from '../../middleware/request-middleware.js';
import { User } from '../../models/User.js';

const loginWrapper: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email });

    if (user && await user.validPassword(password)) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.SECRET as string,
        { expiresIn: '12h' }
      );

      res.status(200).json({ token, uid: user._id });
      return;
    }

    res.status(403).json({ message: 'Auth failed' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = relogRequestHandler(loginWrapper, { skipJwtAuth: true });
