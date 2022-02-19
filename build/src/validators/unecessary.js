"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function unecessaryValidation(param) {
    if (typeof param == 'undefined') {
        return '';
    }
    if (param == undefined || param.replace(/ /g, '') == '') {
        return '';
    }
    return param;
}
exports.default = unecessaryValidation;
