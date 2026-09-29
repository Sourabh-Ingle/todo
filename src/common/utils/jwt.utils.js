import crypto from "node:crypto";
import jwt from 'jsonwebtoken';


const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
    return {rawToken,hashToken}
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE_IN ||'15m'
    })
}
const validateAccessToken = (token) => {
    return jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
};
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE_IN || '7d'
    });
};

const validateRefreshToken = (token) => {
    return jwt.verify(token , process.env.JWT_REFRESH_TOKEN)
}
    


export {
    generateResetToken,
    generateAccessToken,
    validateAccessToken,
    generateRefreshToken,
    validateRefreshToken 
} 