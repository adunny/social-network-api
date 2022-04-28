const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // date format getter here
        },
        username: {
            type: String,
            required: true,
            // ref?
        },
        reactions: [],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;