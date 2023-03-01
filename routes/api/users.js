const router = require("express").Router()
const User = require("../../models/User")

// GET all users
router.get("/", (req, res) => {
    User.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
})

// GET a single user by its _id and populated thought and friend data
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends")
        .then((data) => {
            if (!data) {
                return res.json("user not found")
            } else {
                res.json(data)
            }
        })
})

// POST a new user:
router.post("/", (req, res) => {
    User.create(req.body)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
})

// PUT to update a user by its _id
router.put("/:id", (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((data) => {
            if (!data) {
                res.json("no user with this id")
            } else {
                res.json(data)
            }
        }).catch((err) => {
            res.json(err)
        })
})

// DELETE to remove user by its _id
router.delete("/:id", (req, res) => {
    User.findByIdAndDelete({
        _id: req.params.id
    })
        .then((data) => {
            if (!data) {
                res.json("no user with this id")
            } else {
                res.json("user killed")
            }
        })
})


module.exports = router