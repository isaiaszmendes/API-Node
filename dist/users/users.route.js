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
var router_1 = require("../common/router");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        var _this = _super.call(this) || this;
        _this.on('beforeRender', function (document) {
            document.password = undefined;
        });
        return _this;
    }
    UsersRouter.prototype.applyRoutes = function (app) {
        var _this = this;
        app.get('/users', function (req, res, next) {
            users_model_1.User.find().then(_this.render(res, next));
        });
        app.get('/users/:id', function (req, res, next) {
            users_model_1.User.findById(req.params.id).then(_this.render(res, next));
        });
        app.post('/users', function (req, res, next) {
            var user = new users_model_1.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            user.save()
                .then(_this.render(res, next))
                .catch(next);
        });
        app.put('/users/:id', function (req, res, next) {
            var options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options).exec()
                .then(function (result) {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    res.send(404);
                }
            })
                .then(_this.render(res, next))
                .catch(next);
        });
        app.patch('/users/:id', function (req, res, next) {
            var options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(_this.render(res, next))
                .catch(next);
        });
        app.del('/users/:id', function (req, res, next) {
            users_model_1.User.remove({ _id: req.params.id }).exec()
                .then(function (cmdResult) {
                if (cmdResult.result.n) {
                    res.send(204);
                }
                else {
                    res.send(404);
                }
                return next();
            })
                .catch(next);
        });
    };
    return UsersRouter;
}(router_1.Router));
exports.usersRouter = new UsersRouter();
