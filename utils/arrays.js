'use strict';
/**
 * Created by M.Fakhreddin on 9/11/2016.
 */
let array = {};
/**
 *@param {Array} arr
 *@param {Object} mem
 *@static
 *@return {Boolean}
 **/
array.contains = function (arr, mem) {
    if (arr === null || mem === null ||
        !Array.isArray(arr) ||
        typeof mem !== "object") {
        throw new Error("Invalid input");
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === mem) {
            return true;
        }
    }
    return false
};

/**
 *@param {Array} arr
 *@param {Object} mem
 *@static
 *@return {Boolean}
 **/
array.remove = function (arr, mem) {
    if (arr === null || mem === null ||
        !Array.isArray(arr) ||
        typeof mem !== "object") {
        throw new Error("Invalid input");
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === mem) {
            arr.splice(i, 1);
            return true;
        }
    }
    return false;
};

module.exports = array;