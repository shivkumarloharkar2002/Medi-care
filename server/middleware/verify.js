  
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');


const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: "No access token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid access token" });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "You do not have permission to perform this action" });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
