"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Optional = /** @class */ (function () {
    function Optional(value) {
        this.value = value;
    }
    Optional.of = function (value) {
        if (value === undefined) {
            return Optional.empty();
        }
        return new Optional(value);
    };
    Optional.empty = function () {
        return new Optional(null);
    };
    Optional.prototype.hasValue = function () {
        return this.value !== null;
    };
    Optional.prototype.flatMap = function (projectFn) {
        return this.hasValue()
            ? projectFn(this.value)
            : Optional.empty();
    };
    Optional.prototype.map = function (projectFn) {
        return this.flatMap(function (value) { return Optional.of(projectFn(value)); });
    };
    Optional.prototype.withValue = function (callback) {
        if (this.hasValue()) {
            callback(this.value);
        }
    };
    Optional.prototype.getOrThrow = function () {
        if (!this.hasValue()) {
            throw new Error("Missing Optional value!");
        }
        return this.value;
    };
    Optional.prototype.getOrElse = function (elseValue) {
        return this.hasValue()
            ? this.value
            : elseValue;
    };
    return Optional;
}());
exports.Optional = Optional;
//# sourceMappingURL=Optional.js.map