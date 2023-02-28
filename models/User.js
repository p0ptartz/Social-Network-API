const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email']
        },
        thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought" }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    }, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: true
}
)

userSchema.virtual("friendCount").get(function () {
    return this.friends.length
})

const User = mongoose.model("User", userSchema);
module.exports = User;