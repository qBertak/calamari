"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
var REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;
function kebabCase(str) {
    return str.replace(KEBAB_REGEX, function (match) {
        return '-' + match.toLowerCase();
    });
}
exports.default = kebabCase;
;
exports.kebabReverse = function (str) {
    return str.replace(REVERSE_REGEX, function (match) {
        return match.slice(1).toUpperCase();
    });
};
