import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { registerUser, validateUser } from '../services/auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    if (!registerUser(username, password)) {
      return res.status(409).json({ message: 'User already exists' });
    }
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    if (!validateUser(username, password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}