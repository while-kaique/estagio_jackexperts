
import express from 'express'
import {loginUser, registerUser, verifyJwt} from '../controllers/user.js'


const router = express.Router()

// PUBLIC ROUTES

router.post("/login", loginUser)
router.post("/register", registerUser)

// PRIVATE ROUTES
router.get('/checkauth', verifyJwt , (req, res) => {
    return res.json({msg: "Autenticado com sucesso!"})
})

export default router