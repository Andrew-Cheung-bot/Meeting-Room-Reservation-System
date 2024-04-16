const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'comp7270_group_express';

// generate a token
const generateToken = function (user) {
    return jwt.sign(user, TOKEN_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

// 解码 Token
const decodeToken = function (token) {
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        return decoded;
    } catch (err) {
        return "Fail decode token"; // Token 验证失败
    }
}

module.exports = { generateToken, decodeToken };