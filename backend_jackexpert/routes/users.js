
import express from 'express'
import {loginUser, registerUser, jwtMiddleware, projectsMiddleware, projectMiddleware, cardsMiddleware, homeMiddleware} from '../controllers/user.js'  

const router = express.Router()

// TOKEN ROUTES

router.get('/verifyToken', jwtMiddleware, (req, res) => {
    return res.json({msg: "Token atual é válido!"})
})

// PUBLIC ROUTES

router.post("/login", loginUser)
router.post("/register", registerUser)

// PRIVATE ROUTES

// PROJECTS ROUTES
router.get('/home', homeMiddleware, (req, res) => {
    return res.json({
        msg: "Token validado! Passando nome e projetos...", 
        data: {projects: req.projects, name: req.name}
    })
})
router.get('/projects', projectsMiddleware , (req, res) => {
    return res.json({msg: "Token validado! Passando vários projetos e seus cards inclusos...", projects: req.projects})
})
router.get('/projects/:projectId', projectMiddleware, (req, res) => {
    return res.json({msg: "Token validado! Passando um projeto específico e seus cards inclusos...", project: req.project})
})
router.get('/cards', cardsMiddleware , (req, res) => {
    return res.json({msg: "Token validado! Passando vários cards...", cards: req.cards})
})
router.get('/cards/:cardId', cardsMiddleware, (req, res) => {
    return res.json({msg: "Token validado! Passando um card específico...", card: req.card})
})


export default router