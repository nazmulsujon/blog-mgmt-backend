import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';

const router = Router();

// create/register a user
router.post(
  '/register',
  validateRequest(UserValidations.registerUserValidation),
  AuthControllers.registerUser,
);

// login user
router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidation),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
