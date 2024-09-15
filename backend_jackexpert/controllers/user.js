

import { db } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'   
import moment from 'moment'
dotenv.config()


// JWT ACTIONS
// JWT ACTIONS
const saltRound = 10

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '5m' });
};
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '1d' });
};


function jwtMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    const tokenWithoutBearer = token.split(' ')[1]; // Extrai o token (assumindo o formato: "Bearer token")

    if (!token) {
      return res.status(403).json({ msg: 'Token não fornecido.', token: false });
    }
    jwt.verify(tokenWithoutBearer, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (!req.cookies.refreshToken) return res.status(401).json({msg: 'Token Inválido + nenhum Refresh Token encontrado'});

            const refreshToken = req.cookies.refreshToken; // Obtém o refresh token dos cookies
            jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
                if (err) return res.status(403).json({msg: 'Refresh Token existente é inválido'});

                const token = generateAccessToken({ id: user.id, email: user.email });
                return res.status(200).json({msg: "RefreshToken validado, novo Token disponível!", token });
                
            });
        } else {
            next()
        }
    });
}

// MIDDLEWARE MYSQL
// MIDDLEWARE MYSQL

const projectsMiddleware = (req, res, next) => {
    db.query("SELECT * FROM taskmaneger_db.projects WHERE user_id = ?", [req.id], (err, result)=>{
        if(err){    
            console.log(err)
        }     

        if (result.length == 0){
            req.projects = false
            next();
            return
        }
        req.projects = result
        next();
    })
}
const projectMiddleware = (req, res, next) => {
    db.query("SELECT * FROM taskmaneger_db.projects WHERE id = ?", [decoded.id], (err, result)=>{
        if(err){    
            console.log(err)
        }     

        if (result.length == 0){
            req.projects = false
            next();
            return
        }
        req.projects = result
        next();
    })
}
const createProjectMiddleware = (req, res, next) => {
    console.log('passo 1')

    const token = req.body.token;
    if (!token) {
        console.log('passo 2')
        return res.status(403).json({ msg: 'Token não fornecido.', token: false });
    }
    console.log('passo 3')


    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.log('passo 4')
        if (err) {
            console.log('passo 5')
            return res.status(401).json({msg: 'Token Inválido', token: false});
        } else {
            console.log('verify true')
            const user = decoded
            
            const dateToday = moment().format('YYYY-MM-DD')

            db.query(`INSERT INTO taskmaneger_db.projects (name, user_id, description, category, date) VALUES (?, ?, ?, ?, ?)`,[req.body.name, user.id, req.body.description, req.body.category, dateToday], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ msg: 'Erro ao inserir projeto.', err });
                }
                console.log('query true')
                const newProject = {name: req.body.name, description: req.body.description, category: req.body.category, date: dateToday}
                req.project = newProject
                
                next()
            })
        }
    });
}
const cardsMiddleware = (req, res, next) => {
    db.query("SELECT * FROM taskmaneger_db.projects WHERE user_id = ?", [decoded.id], (err, result)=>{
        if(err){    
            console.log(err)
        }     

        if (result.length == 0){
            req.projects = false
            next();
            return
        }
        req.projects = result
        next();
    })
}
const homeMiddleware = (req, res, next) => {
    
    const token = req.headers['authorization'];
    const tokenWithoutBearer = token.split(' ')[1]; // Extrai o token (assumindo o formato: "Bearer token")

    if (!token) {
        return res.status(403).json({ msg: 'Token não fornecido.', token: false });
    }

    jwt.verify(tokenWithoutBearer, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({msg: 'Token Inválido', token: false});
        } else {
            const user = decoded
            db.query("SELECT name FROM taskmaneger_db.users WHERE id = ?", [user.id], (err, user_result)=> {
                if(err){    
                    return res.json({msg: 'Usuário não existe.', token: false})
                }     
                const name = user_result[0].name
                db.query("SELECT * FROM taskmaneger_db.projects WHERE user_id = ?", [user.id], (err, projects_result)=>{
                    
                    if(err){    
                        return res.json({msg: 'Projeto não existe', token: false})
                    }     
                    
                    if (projects_result.length == 0){
                        req.projects = false
                        req.name = name.split(' ', 1)[0]
                        next()
                        return 
                    }
                    req.projects = projects_result
                    req.name = name
                    next();
                })
            })
        }
    });
}


// LOGIN/REGISTER ACTIONS
// LOGIN/REGISTER ACTIONS

const loginUser = (req, res) => {
    const {email, password} = req.body
    db.query("SELECT * FROM taskmaneger_db.users WHERE email = ?", [email], (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, cryptResult)=>{
                if (cryptResult) {
                    const { email, id } = result[0]
                    const user = {id, email}

                    const token = generateAccessToken(user)
                    const refreshToken = generateRefreshToken(user)

                    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 100, path: '/' });
                    res.json({msg: "Usuário logado com sucesso!", token, login: true, user: {name: result[0].name}})}
                else {
                    res.send({msg: "A senha está incorreta."})
                }
            })
        } else {
            res.send({msg: 'Usuário não encontrado'})
        }
    })
}
const registerUser = (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const dateToday = moment().format('YYYY-MM-DD')
    if (!name || !email || !password || !confirmPassword){
        return res.status(422).send({msg: 'Insira todas as informações para se cadastrar.'})
    }
    if ((password !== confirmPassword)) {
        return res.status(422).send({msg: 'Senhas não coincidem.'})
    }
    
    db.query("SELECT * FROM taskmaneger_db.users WHERE email = ?", [email], (err, result)=>{
        if(err){    
            return res.send(err)
        }

        if (result.length == 0){
            bcrypt.hash(password, saltRound, (err, hash) => {
                db.query(`INSERT INTO taskmaneger_db.users (name, email, password, date) VALUES (?, ?, ?, ?)`,[name, email, hash, dateToday], (err, result) => {
                    if (err) {
                        return res.send(err)
                    }
                    const newId = result
                    const user = {email, newId}

                    const token = generateAccessToken(user)
                    const refreshToken = generateRefreshToken(user)

                    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
                    return res.send({msg: "Usuário cadastrado com sucesso!", token, login: true, name})
                })
            })
        } else {
            return res.send({msg: 'Email já cadastrado.'})
        }
    })
}

export {loginUser, registerUser, jwtMiddleware, projectsMiddleware, projectMiddleware, cardsMiddleware, homeMiddleware, createProjectMiddleware} 