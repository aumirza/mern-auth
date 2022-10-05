import { Document, Model } from 'mongoose'

declare interface IUserDocument extends Document, SchemaTimestampsConfig {
    name: string
    email: string
    password: string
    confirmPassword: string | undefined
    isAdmin: boolean
    isActive: boolean
    activationToken: string
    resetPasswordToken: string
    googleProvidor: {
        id: string
        token: string
    }
    facebookProvidor: {
        id: string
        token: string
    }
}

declare interface IUserMethods {
    hashPassword: (password: string) => string
    checkPassword: (password: string) => boolean
    generateActivationToken: () => string
    generateResetPasswordToken: () => string
}

declare interface IUserStatics {
    upsertSocialUser: (
        accessToken: string,
        refreshToken: string,
        profile: socialProfile,
        cb: CallableFunction,
    ) => Promise<IUserDocument>
    serialize: (user: IUser, done: CallableFunction) => string
    deserialize: (id: string, done: CallableFunction) => Promise<IUserDocument>
}

declare interface IUser extends IUserDocument, IUserMethods, IUserStatics {}
declare interface IUserModel extends Model<IUserDocument>, IUserStatics, IUserMethods {}
