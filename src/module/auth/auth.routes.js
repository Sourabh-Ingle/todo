import * as Controllers from './auth.controllers.js';
import { Router } from 'experss';
import RegisterDTO from './dto/register.dto.js';
import LoginDTO from './dto/login.dto.js'; 
import ForgetPasswordDTO from './dto/forget-password.dto.js';
import ResetPassword from './dto/reset-password.dto.js';
import validate from './../../common/middleware/validate.middleware.js';
import { authenticate,authorize } from './auth.middleware.js';

const router = Router();

router.post('/', validate(RegisterDTO), Controllers.register);

router.post('/login', validate(LoginDTO), Controllers.login);
router.post("/refresh-token", Controllers.refreshToken);
router.get('/getme', authenticate, Controllers.getMe);

router.get('/verify-email:token', Controllers.verifyEmail);

router.post('/logout', authenticate, Controllers.logout);

router.post('/forgot-password', validate(ForgetPasswordDTO), Controllers.forgotPassword);
router.put('/reset-password:token', validate(RegisterDTO), Controllers.resetPassword);

export default router;