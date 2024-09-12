
import express from 'express'
import {loginUser, registerUser, jwtMiddleware} from '../controllers/user.js'  

const router = express.Router()

// PUBLIC ROUTES

router.post("/login", loginUser)
router.post("/register", registerUser)

// PRIVATE ROUTES
router.get('/task', jwtMiddleware , (req, res) => {
    return res.json({msg: "Token validado!", user: req.user})
})

export default router