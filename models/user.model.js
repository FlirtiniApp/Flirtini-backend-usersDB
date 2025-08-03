const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: [true, 'Login is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'First name is required'],
        },
        birthDate: {
            type: Date,
            required: [true, 'Birth date is required'],
        },
        favouriteDrinks: {
            type: [Number],
            required: false,
            default: []
        },
        favouriteIngredients: {
            type: [String],
            required: false,
            default: []
        },
        friends: {
            type: [String],
            required: false,
            default: []
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        lists: [
            {
                _id: false,
                name: {
                    type: String,
                    required: false
                },
                drinks: {
                    type: [String],
                    required: false,
                    default: []
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;