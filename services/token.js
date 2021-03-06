'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');
const services = require('../services');

function generate(user) {
    const payload = {
        sub: services.encrypt(String(user._id)),
        iat: moment.unix(),
        exp: moment().add(config.EXP_DAYS, 'days').unix()
    };
    return jwt.encode(payload, process.env.JWT_SECRET);
}

function decode(token) {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, process.env.JWT_SECRET);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Your authorization has expired'
                });
            }
            const userId = services.decrypt(payload.sub);
            resolve(userId);
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });
}

module.exports = {
    generate,
    decode
};
