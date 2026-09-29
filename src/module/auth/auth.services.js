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
    // need password checking code
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw ApiError.unautherised("Invalid credentials.");
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

const refresh = async (token) => {
    if (!token) {
        throw ApiError.conflict("Token required");
    }
    const hashRefreshToken = hashToken(token);

    const user = await User.findOne({ refreshToken: hashRefreshToken }).select("+refreshToken");

    if (!user) {
        throw ApiError.conflict("Invalid");
    };

    user.accessToken = generateAccessToken({ id: user._id, email: user.email, role: user.role});
    const refreshToken =  generateRefreshToken({ id: user._id, email: user.email });
    user.refreshtoken = hashToken(refreshToken);
    user.save({ validateBeforeSave: true });
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return ({ userObj, refreshToken, accessToken });

}

const logout = async(userId) => {
    await User.findByIdAndUpdate(userId, {
        refreshToken: null
    })
}

const getMe = async () => {
    const user = await User.findById(userId);
    if (!user) {
        throw ApiError.notFound("User not found");
    }
    return user;
}


export {
    registerUser, login, logout, getMe,refresh
    
}