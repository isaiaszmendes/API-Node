"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var environment_1 = require("../common/environment");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 70,
        minlength: 2
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    age: {
        type: Number
    }
}, {
    versionKey: false
});
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        bcrypt.hash(user.password, environment_1.environment.security.saltRounds)
            .then(function (hash) {
            user.password = hash;
            next();
        })
            .catch(next);
    }
});
exports.User = mongoose.model('User', userSchema);
