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
        minlength: 3
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

const hashPassword = (obj, next) =>{
    bcrypt.hash(obj.password, environment.security.saltRounds)
    .then(hash => {
        obj.password = hash
        next()
    })
    .catch(next)
}

const saveMiddleware = function(next){
    const user: User = this
    if (!user.isModified('password')) {
        next()
    }else{
        hashPassword(user, next)
    }
}

const updateMiddleware = function(next){
   
    if (!this.getUpdate().password) {
        next()
    }else{
        hashPassword(this.getUpdate(), next)
    }
}

userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

export const User = mongoose.model<User>('User', userSchema);