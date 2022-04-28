const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required.',
            trim: true,
        },
        email: {
            type: String,
            required: 'Email is required.',
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [],
        friends: []
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', UserSchema);

module.exports = User;