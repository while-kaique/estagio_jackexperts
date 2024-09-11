

import { db } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const saltRound = 10

const verifyJwt = (req, res, next) => {
    const token = req.headers["acess-token"];
    if (!token) {
        return res.json({msg: "Token não identificado."})
    }
    const secret = process.env.SECRET
    jwt.verify(token, secret, (err, decoded) => {
        console.log('chegou no verify')
        if (err) {return res.send({msg: "Não autenticado"})}
        req.userId = decoded.id;
        console.log('verificou')
        next()
    })
}

const loginUser = (req, res) => {
    const {email, password} = req.body
    db.query("SELECT * FROM taskmaneger_db.users WHERE email = ?", [email], (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, cryptResult)=>{
                if (cryptResult) {
                    const secret = process.env.SECRET
                    console.log(result)
                    const token = jwt.sign(
                        {
                            id: result[0].id_users
                        },
                        secret,
                        { expiresIn: 300}   
                    )
                    res.send({msg: "Usuário logado com sucesso!", token, login: true, user: {name: result[0].name}})}
                else {res.send({msg: "A senha está incorreta."})}
            })
        } else {
            res.send({msg: 'Usuário não encontrado'})
        }
    })
}
const registerUser = (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const dateToday = new Date().toISOString().split('T')[0]
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
                    return res.send({msg: "Usuário cadastrado com sucesso!", login: true})
                })
            })
        } else {
            return res.send({msg: 'Email já cadastrado.'})
        }
    })
}

export {loginUser, registerUser, verifyJwt}