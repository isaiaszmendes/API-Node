"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = function (req, res, err, done) {
    err.toJSON = function () {
        return {
            message: err.message
        };
    };
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            break;
        default:
            break;
    }
    done();
};
