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
var events_1 = require("events");
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Router.prototype.render = function (response, next) {
        var _this = this;
        return function (document) {
            if (document) {
                _this.emit('beforeRender', document);
                response.json(document);
            }
            else {
                response.send(404);
            }
            return next();
        };
    };
    Router.prototype.renderAll = function (response, next) {
        var _this = this;
        return function (documents) {
            if (documents) {
                documents.forEach(function (document) {
                    _this.emit('beforeRender', document);
                });
                response.json(documents);
            }
            else {
                response.json([]);
            }
            return next();
        };
    };
    return Router;
}(events_1.EventEmitter));
exports.Router = Router;
