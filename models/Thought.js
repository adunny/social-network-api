const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter here
        }
    },
    {
        id: false,
        toJSON: {
            getters: true,
        }
    }
)

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
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;