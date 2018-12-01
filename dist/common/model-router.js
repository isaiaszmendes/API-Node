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
var mongoose = require("mongoose");
var router_1 = require("./router");
var restify_errors_1 = require("restify-errors");
var ModelRouter = /** @class */ (function (_super) {
    __extends(ModelRouter, _super);
    function ModelRouter(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        // Para paginação
        _this.pageSize = 20;
        _this.validateId = function (req, res, next) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Document not found'));
            }
            else {
                next();
            }
        };
        _this.findAll = function (req, res, next) {
            var page = parseInt(req.query._page || 1);
            page = page > 0 ? page : 1;
            var skip = (page - 1) * _this.pageSize;
            _this.model.find()
                .skip(skip)
                .limit(_this.pageSize)
                .then(_this.renderAll(res, next))
                .catch(next);
        };
        _this.findById = function (req, res, next) {
            _this.model.findById(req.params.id).then(_this.render(res, next));
        };
        _this.save = function (req, res, next) {
            var document = new _this.model(req.body);
            document.save()
                .then(_this.render(res, next))
                .catch(next);
        };
        _this.replace = function (req, res, next) {
            var options = { runValidators: true, overwrite: true };
            _this.model.update({ _id: req.params.id }, req.body, options).exec()
                .then(function (result) {
                if (result.n) {
                    return _this.model.findById(req.params.id);
                }
                else {
                    res.send(404);
                }
            })
                .then(_this.render(res, next))
                .catch(next);
        };
        _this.update = function (req, res, next) {
            var options = { runValidators: true, new: true };
            _this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(_this.render(res, next))
                .catch(next);
        };
        _this.delete = function (req, res, next) {
            _this.model.remove({ _id: req.params.id }).exec()
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
        };
        return _this;
    }
    ModelRouter.prototype.envelope = function (document) {
        var resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = "/" + this.model.collection.name + "/" + resource._id;
        return resource;
    };
    return ModelRouter;
}(router_1.Router));
exports.ModelRouter = ModelRouter;
