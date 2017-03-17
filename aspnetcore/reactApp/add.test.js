"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var alsatian_1 = require("alsatian");
var add_1 = require("./add");
var AddTests = (function () {
    function AddTests() {
    }
    AddTests.prototype.shouldNotThrowError = function () {
        alsatian_1.Expect(function () { return add_1.default(1, 2); }).not.toThrow();
    };
    AddTests.prototype.shouldAdd = function (a, b, r) {
        alsatian_1.Expect(add_1.default(a, b)).toEqual(r);
    };
    return AddTests;
}());
__decorate([
    alsatian_1.Test()
], AddTests.prototype, "shouldNotThrowError", null);
__decorate([
    alsatian_1.TestCase(1, 2, 3)
], AddTests.prototype, "shouldAdd", null);
exports.AddTests = AddTests;
//# sourceMappingURL=add.test.js.map