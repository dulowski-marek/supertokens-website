"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("./Session");
var Subject_1 = require("./Subject");
var GlobalSessionManager = /** @class */ (function () {
    function GlobalSessionManager() {
        this.session$ = new Subject_1.Subject();
    }
    GlobalSessionManager.prototype.next = function (frontToken) {
        throw new Error('test');
        this.session$.next(frontToken.map(function (token) { return new Session_1.Session(token); }));
    };
    GlobalSessionManager.prototype.subscribe = function (observer) {
        return this.session$.subscribe(observer);
    };
    return GlobalSessionManager;
}());
exports.default = new GlobalSessionManager();
//# sourceMappingURL=GlobalSessionManager.js.map