const express = require("express");
const { Register, Login, UserDetails } = require("../controllers/UserController");
const router = express.Router();
const { VerifyTokenMiddleware } = require("../middlewares");


router.post("/register", Register);
router.post("/login", Login);
router.get("/user/data", VerifyTokenMiddleware, UserDetails);


module.exports = router;
