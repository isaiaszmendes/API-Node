"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = function (req, res, next) {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        req.reqBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (error) {
            return next(new Error("Invalid Content: " + error.message));
        }
    }
    return next();
};
