"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function basicValidation(...params) {
    for (let index in params) {
        let param = params[index];
        if (typeof param == "undefined") {
            return false;
        }
        if (param == undefined || param.replace(/ /g, "") == "") {
            return false;
        }
    }
    return true;
}
exports.default = basicValidation;
