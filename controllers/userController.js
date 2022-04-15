const { user } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
require("dotenv").config();

exports.createUser = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw {
                status: 422,
                message: errors
            }
        }
        const newUser = await user.create(req.body);
        res.status(201).json({
            newUser
        });
    } catch (error) {
        next(error);
    }
}

exports.loginUser = async(req, res, next) => {
    try {
        const userFind = await user.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userFind) {
            throw {
                status: 400,
                message: 'Invalid User or Password'
            }
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, userFind.password);
        if (!isPasswordValid) {
            throw {
                status: 400,
                message: 'Invalid User or Password'
            }
        }
        const token = jwt.sign({
            userId: userFind.id,
            username: userFind.username,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token
        });
    } catch (error) {
        next(error);
    }
}