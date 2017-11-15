'use strict';
const os = require('os');
module.exports = {
    IS_DEV: true,
    IS_WINDOWS: /^win/.test(os.platform()),
    LOG_ADDRESS: __dirname + "/log/logs.txt",
    EXCEPTION_ADDRESS: __dirname + "/log/exceptions.txt",
};