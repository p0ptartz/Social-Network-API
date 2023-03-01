const router = require("express").Router()
const { User, Thoughts } = require("../../models/Thought")

// GET to get all thoughts
router.get("/thoughts", (req, res) => {
    Thoughts.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
})

// GET to get a single thought by its _id
router.get("/thoughts/:id", (req, res) => {
    Thoughts.findById(req.params.id)
        .populate("reactions")
        .then((data) => {
            if (!data) {
                return res.json("no thought found")
            } else {
                res.json(data)
            }
        })
        .catch((err) => {
            res.json(err);
        });
})

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post("/thoughts", (req, res) => {
    Thoughts.create(req.body)
        .then((data) => {
            return User.findByIdAndUpdate(
                data.userId,
                { $push: { thoughts: data._id } },
                { new: true }
            );
        })
        .catch((err) => {
            res.json(err)
        })
})

// PUT to update a thought by its _id
router.put("/thoughts/:id", (req, res) => {
    Thoughts.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((data) => {
            if (!data) {
                res.json("no thought found")
            } else {
                res.json(data)
            }
        }).catch((err) => {
            res.json(err)
        })
})

// DELETE to remove a thought by its _id
router.delete("/thoughts/:id", (req, res) => {
    Thoughts.findByIdAndDelete({
        _id: req.params.id
    })
        .then((data) => {
            if (!data) {
                res.json("no thought found")
            } else {
                res.json("thought killed")
            }
        })
})

module.exports = router