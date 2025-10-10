const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    }, process.env.ACCESS_TOKEN_SECRET);
}; 

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    }, process.env.REFRESH_TOKEN_SECRET);
};

const setTokens = (user, res) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,

        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
         maxAge : 7 * 60 * 60 * 1000, // 7 hours in milliseconds
        // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', // 'none' for cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken, refreshToken };
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    setTokens,
};
