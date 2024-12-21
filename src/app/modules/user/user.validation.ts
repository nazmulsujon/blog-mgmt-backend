import z from 'zod';

const registerUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'User Name is Required' }),
    email: z.string({ required_error: 'User email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['admin', 'user']).default('user'),
  }),
});
const loginUserValidation = z.object({
  email: z.string({ required_error: 'User email is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const UserValidations = {
  registerUserValidation,
  loginUserValidation,
};