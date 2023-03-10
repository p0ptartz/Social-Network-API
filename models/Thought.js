const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
            // Use a getter method to format the timestamp on query ??????
        }
    }, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: true
})

const thoughtSchema = new mongoose.Schema(
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
            // Use a getter method to format the timestamp on query ????????
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: true,
        versionKey: false,
    }
)

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
})

const Thought = mongoose.model("Thought", thoughtSchema)

module.exports = Thought