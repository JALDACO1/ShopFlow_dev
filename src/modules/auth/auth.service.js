const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const register = async ({name, email, password}) => {
    const existingUser = await User.findOne({ where: { email } });
    if(existingUser) {
        const error = new Error('Email already in use');
        error.status = 409;
        throw error;
    }
}

const password_Hash = await bycrypt.hash(password, 10);
const newUSer = await User.create({ name, email, password: password_Hash });
return { id: newUSer.id, name: newUSer.name, email: newUSer.email, role: newUSer.role };

const login = async ({ email, password }) => {
    const user  = await User.findOne({ where: { email } });
    if(!user) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const valid = await bycrypt.compare(password, user.password);
    if(!valid) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const payload  = { id: user.id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { register, login };