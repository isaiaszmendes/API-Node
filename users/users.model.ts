import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface User extends mongoose.Document{
    name: String
    email: String
    password: String
}

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
}, {
    versionKey: false
})


export const User = mongoose.model<User>('User', userSchema);