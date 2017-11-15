/**
 * Created by mohammad.fakhreddin on 26/09/2017.
 */
'use strict';
const fs = require('fs');
const config = require('../config');
const errors = require('./errors');

exports.log = function (filename, message) {
    if (typeof filename !== "string" || filename === ""
        || typeof message !== "string" || message === "") {
        throw Error(errors.internal.INVALID_ARG.description);
    }
    if (config.IS_DEV) {
        console.log(message, filename);
    } else {
        if (fs.existsSync(config.LOG_ADDRESS)) {
            fs.appendFile(config.LOG_ADDRESS, message.concat(filename), 'utf8', function () {
            });
        } else {
            fs.writeFile(config.LOG_ADDRESS, message.concat(filename), 'utf8', function () {
            });
        }
    }
};

exports.logError = function (filename, message) {
    if (filename === null || filename === ""
        || message === null || message === "") {
        throw Error(errors.internal.INVALID_ARG.description);
    }
    if (config.IS_DEV) {
        console.log(message, filename);
    }
    if (fs.existsSync(config.EXCEPTION_ADDRESS)) {
        fs.appendFileSync(config.EXCEPTION_ADDRESS, message.concat(filename), 'utf8');
    } else {
        fs.writeFileSync(config.EXCEPTION_ADDRESS, message.concat(filename), 'utf8')
    }
};