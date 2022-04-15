const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async(req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw {
                status: 401,
                message: 'Authorization denied'
            }
        }
        const token = authHeader;
        let decoded;
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw {
                status: 401,
                message: 'Invalid token'
            }
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        next(error);
    }
}