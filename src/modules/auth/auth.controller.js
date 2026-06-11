const service = require('./auth.service');

const register = async (req, res, next) => {
    try {
        const user = await service.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}


const login = async (req, res, next) => {
    try {
        const data = await service.login(req.body);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login };