/**
 * Created by mohammad.fakhreddin on 27/09/2017.
 */
'use strict';

class error {
    /**
     * @param {number} code
     * @param {string} description
     * */
    constructor(code, description) {
        let _this = this;
        _this.code = code;
        _this.description = description;
    }
}
exports.internal = {
    INVALID_ARG: new error(1, "Invalid arguments"),
    MONGODB_CREATION_FAILED: new error(2, "Failed to create new mongodb collection object")
};