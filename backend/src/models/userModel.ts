import { Schema, model, SchemaOptions } from 'mongoose'
import {
    IUser,
    IUserDocument,
    IUserMethods,
    IUserModel,
    IUserStatics,
} from '../types/modelTypes/userModel'
import { UserMethods, UserStatics } from '../helpers/userMethods'

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: false,
        getters: true,
        transform: function (doc, ret: IUser) {
            const user: Partial<IUser> = ret
            // delete user.password
            // delete user.confirmPassword
            // delete user.activationToken
            // delete user.resetPasswordToken
            // delete user.__v
            // delete user.createdAt
            return user
        },
    },
}

export const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (this: IUserDocument, el: string) {
                    return el === this.password
                },
                message: 'Passwords are not the same',
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        activationToken: {
            type: String,
        },

        resetPasswordToken: {
            type: String,
        },
        googleProvidor: {
            type: {
                id: String,
                token: String,
            },
            select: false,
        },
        facebookProvidor: {
            type: {
                id: String,
                token: String,
            },
            select: false,
        },
    },
    schemaOptions,
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = this.hashPassword(this.password)
    this.confirmPassword = undefined
    next()
})

userSchema.methods = UserMethods
userSchema.statics = UserStatics

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString()
// })

const User = model<IUser, IUserModel>('User', userSchema)

export default User
