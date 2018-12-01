"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var environment_1 = require("../common/environment");
var mongoose = require("mongoose");
var merge_pacth_parser_1 = require("./merge-pacth.parser");
var error_handler_1 = require("./error.handler");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.initializeDb = function () {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url);
    };
    Server.prototype.initRoutes = function (routers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                // Create server
                _this.app = restify.createServer({
                    name: 'api',
                    version: '1.0.0',
                });
                _this.app.use(restify.plugins.queryParser());
                _this.app.use(restify.plugins.bodyParser());
                _this.app.use(merge_pacth_parser_1.mergePatchBodyParser);
                // Routes 
                _this.app.get('/', function (req, res, next) {
                    res.json({
                        name: 'api',
                        author: 'Isaias Mendes'
                    });
                    next();
                });
                for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
                    var router = routers_1[_i];
                    router.applyRoutes(_this.app);
                }
                // Port
                _this.app.listen(environment_1.environment.server.port, function () {
                    resolve(_this.app);
                });
                _this.app.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                return reject(error);
            }
        });
    };
    Server.prototype.bootstrap = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return this.initializeDb().then(function () {
            return _this.initRoutes(routers).then(function () { return _this; });
        });
    };
    return Server;
}());
exports.Server = Server;
