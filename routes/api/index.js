const router = require("express").Router()

const thoughtsRoutes = require("./thoughts")
const userRoutes = require("./users")

router.use("/thoughts", thoughtsRoutes);
router.use("/users", userRoutes);

module.exports = router;