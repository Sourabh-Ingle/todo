import ApiError from '../../common/utils/app-error.js';
import ApiResponse from '../../common/utils/app-response.js'
import { generateAccessToken, generateRefreshToken, generateResetToken } from '../../common/utils/jwt.utils.js';
import User from './auth.models.js'



const findOneVal = async (user,val,message) => {
    const existed = await user.findone({ val });
    if (existed) {
        throw ApiError.conflict(message)
    }
    return existed;
}

const hashToken=(token)=>crypto.createHash('sha265').update(token).digest('hex')

const registerUser = async ({ name, email, password, role }) => {
    
    const existed = await User.findone({ email });

    if (existed) {
        throw ApiError.conflict("User with email already existed!!!")
    }
    const { rawToken, hashToken } = generateResetToken();

    const user = await User.create({
        name,
        email,
        role,
        password,
        verificationToken: hashToken
    })

    const userObj = user.toObject();
    delete userObj.password;
    // email logic
    
    return {
        userObj,
        rawToken
    }
}

const login = async ({ email,password}) => {
    if (!email && !password) {
        throw ApiError.conflict("Username or Password is requied!!!");
    }
    const user = await User.findone({ email }).select("+password");

    if (!user) {
        throw ApiError.conflict("Invalid Credentials!!!")
    }
   
    if (!user.isValid) {
        throw ApiError.forbiden("Please verify your email before login");
    }

    const accessToken = generateAccessToken({ id: user._id, email: user.email, role: user.role})
    const refreshtoken = generateRefreshToken({ id: user._id, email: user.email })

    user.refreshtoken = hashToken(refreshtoken);
    user.save({ validateBeforeSave: true });

    const userObj = user.toObject();
    delete userObj.refreshToken;
    delete userObj.password;

    return ({ user: userObj, accessToken, refreshtoken });
    
}



export {
    registerUser,login
    
}