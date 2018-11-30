import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt' 
import { environment } from '../common/environment'

const Schema = mongoose.Schema

export interface User extends mongoose.Document{
    name: String
    email: String
    password: String
}

const userSchema = new Schema({
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
})


userSchema.pre('save', function(next){
    const user: User = this
    if (!user.isModified('password')) {
        next()
    }else{
        bcrypt.hash(user.password, environment.security.saltRounds)
            .then(hash => {
                user.password = hash
                next()
            })
            .catch(next)
    }
})

export const User = mongoose.model<User>('User', userSchema);