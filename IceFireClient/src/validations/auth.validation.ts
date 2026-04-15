import { body } from 'express-validator';

export const registerValidation = [
  body('username').isString().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 6 }),
];

export const loginValidation = [
  body('username').isString(),
  body('password').isString(),
];