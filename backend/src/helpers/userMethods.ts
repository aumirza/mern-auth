import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import {
    activationTokenExpiresIn,
    activationTokenSecret,
    resetPasswordTokenExpiresIn,
    resetPasswordTokenSecret,
} from '../config/index'
import { IUser, IUserModel } from '../types/modelTypes/userModel'

function generateActivationToken(this: IUser) {
    const activationToken = jwt.sign({ id: this._id }, activationTokenSecret, {
        expiresIn: activationTokenExpiresIn,
    })

    this.activationToken = activationToken
    this.save()
    return activationToken
}

function generateResetPasswordToken(this: IUser) {
    const resetPasswordToken = jwt.sign({ id: this._id }, resetPasswordTokenSecret, {
        expiresIn: resetPasswordTokenExpiresIn,
        // algorithm: 'HS256',
    })

    this.resetPasswordToken = resetPasswordToken
    this.save()
    return resetPasswordToken
}

function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10)
}

function checkPassword(this: IUser, password: string) {
    return bcrypt.compareSync(password, this.password)
}

function upsertSocialUser(
    this: IUserModel,
    accessToken: string,
    refreshToken: string,
    profile: socialProfile,
    cb: CallableFunction,
) {
    const user = this.findOne({
        'googleProvidor.id': profile.id,
    })

    if (user) {
        return cb(null, user)
    }

    const newUser = new this({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id,
        googleProvidor: {
            id: profile.id,
            token: accessToken,
        },
    })

    newUser.save((error, savedUser) => {
        if (error) console.log(error)
        return cb(error, savedUser)
    })
}

function serialize(user: IUser, done: CallableFunction) {
    return {
        _id: user._id,
    }
}

function deserialize(this: IUserModel, id: string, done: CallableFunction) {
    return this.findById(id)
}

export const UserMethods = {
    generateActivationToken,
    generateResetPasswordToken,
    hashPassword,
    checkPassword,
}

export const UserStatics = {
    upsertSocialUser,
    serialize,
    deserialize,
}
