
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
    return res.json({msg: "Token validado! Passando projetos...", projects: req.projects})
})
router.get('/projects/:projectId', projectMiddleware, (req, res) => {
    return res.json({msg: "Token validado! Passando projeto específico...", project: req.project})
})
router.get('/projects/:projectId/cards', cardsMiddleware, (req, res) => {
    return res.json({msg: "Token validado! Passando cards de um projeto específico...", cards: req.cards})
})


export default router