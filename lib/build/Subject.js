"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = new Set();
    }
    Subject.prototype.next = function (item) {
        this.observers.forEach(function (observer) { return observer.next(item); });
    };
    Subject.prototype.subscribe = function (observer) {
        var _this = this;
        this.observers.add(observer);
        return function () {
            _this.observers.delete(observer);
        };
    };
    return Subject;
}());
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map