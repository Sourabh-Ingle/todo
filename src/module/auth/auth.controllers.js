import * as Services from './auth.services.js';
import ApiResponse from './../../common/utils/app-response.js';

const register = async(req,res)=> {
    const user = await Services.register(req.body);
    if (!user) {
        throw ApiError.conflict("User not create")
    }
    ApiResponse.created(
        res,
        "Registration successful. Please verify your email.",
        user,
    );
}

const login = async (res,req) => {
    const { user, accessToken, refreshToken } = await Services.login(req.body);
    ApiResponse.ok(res, "Login successful", { user, accessToken,refreshToken });
}

const refreshToken = async (req, res) => {
    const token = req.cookies?.refreshToken;
    const { accessToken } = await Services.refresh(req.body?.refreshToken);
    ApiResponse.ok(res, "Token refreshed", { accessToken });
};

const logout = async (req, res) => {
    const user = await Services.logout(req.user.id);
    // res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logged out successfully");
};

const verifyEmail = async (req, res) => {
    await Services.verifyEmail(req.params.token);
    ApiResponse.ok(res, "Email verified successfully");
};

const forgotPassword = async (req, res) => {
    await Services.forgotPassword(req.body.email);
    ApiResponse.ok(res, "Password reset email sent");
};

const resetPassword = async (req, res) => {
    await Services.resetPassword(req.params.token, req.body.password);
    ApiResponse.ok(res, "Password reset successful");
};

const getMe = async (req, res) => {
    const user = await Services.getMe(req.user.id);
    ApiResponse.ok(res, "User profile", user);
};

export {
    getMe, resetPassword, forgotPassword,
    verifyEmail, logout, refreshToken, login,
    register
}
