"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
var users_route_1 = require("./users/users.route");
var server = new server_1.Server();
server.bootstrap([users_route_1.usersRouter]).then(function (server) {
    console.log('Server is listening on: ', server.app.address());
}).catch(function (err) {
    console.log('Server failed to start');
    console.error(err);
    process.exit(1);
});
