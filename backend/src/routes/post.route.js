const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
router.post("/", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "User authorized successfully",
        user: req.user
    });
});

module.exports = router;