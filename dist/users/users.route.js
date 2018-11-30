"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var model_router_1 = require("../common/model-router");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        var _this = _super.call(this, users_model_1.User) || this;
        _this.on('beforeRender', function (document) {
            document.password = undefined;
        });
        return _this;
    }
    UsersRouter.prototype.applyRoutes = function (app) {
        app.get('/users', this.findAll);
        app.get('/users/:id', [this.validateId, this.findById]);
        app.post('/users', this.save);
        app.put('/users/:id', [this.validateId, this.replace]);
        app.patch('/users/:id', [this.validateId, this.update]);
        app.del('/users/:id', [this.validateId, this.delete]);
    };
    return UsersRouter;
}(model_router_1.ModelRouter));
exports.usersRouter = new UsersRouter();
