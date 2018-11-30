"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var environment_1 = require("../common/environment");
var mongoose = require("mongoose");
var merge_pacth_parser_1 = require("./merge-pacth.parser");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.initializeDb = function () {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    };
    Server.prototype.initRoutes = function (routers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                // Create server
                _this.app = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                _this.app.use(restify.plugins.queryParser());
                _this.app.use(restify.plugins.bodyParser());
                _this.app.use(merge_pacth_parser_1.mergePatchBodyParser);
                // Routes   
                for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
                    var router = routers_1[_i];
                    router.applyRoutes(_this.app);
                }
                // Port
                _this.app.listen(environment_1.environment.server.port, function () {
                    resolve(_this.app);
                });
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