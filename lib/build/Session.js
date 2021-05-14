"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session = /** @class */ (function () {
    function Session(tokenInfo) {
        this.tokenInfo = tokenInfo;
    }
    Session.prototype.getUserId = function () {
        return this.tokenInfo.uid;
    };
    Session.prototype.getPayload = function () {
        return this.tokenInfo.up;
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=Session.js.map