import ApiError from '../../common/utils/app-error.js';
import User from './auth.models.js';
import { verifivalidateAccessToken } from './../../common/utils/jwt.utils.js';


const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw ApiError.unauthorized("Not Authenticated!!!");
    }
    const decoded = verifivalidateAccessToken(token);

    if (!decoded) {
        throw ApiError.unauthorized("Invalid AccessToken!!!");
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
        throw ApiError.unautherised("User no longer existed")
    }

    req.user = {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role
    }

    next();
};

const authorize =  (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            throw ApiError.forbiden("You do not have permission to perform this action.")
        }
        next();
    }
}


export {authenticate,authorize}