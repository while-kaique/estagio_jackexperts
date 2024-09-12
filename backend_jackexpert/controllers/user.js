

import { db } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'   
import moment from 'moment'
dotenv.config()

const saltRound = 10

// JWT ACTIONS
// JWT ACTIONS

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '5m' });
};
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '1d' });
};
const refreshToken = (req, res) => {
    if (!req.cookiesrefreshToken) return res.sendStatus(401).json({msg: 'Não tem o refreshToken, amigo'});
    const refreshToken = req.cookies.refreshToken; // Obtém o refresh token dos cookies


    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const token = generateAccessToken({ id: user.id, email: user.email });
        res.json({ token });
    });
};


function jwtMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    const tokenWithoutBearer = token.split(' ')[1]; // Extrai o token (assumindo o formato: "Bearer token")
    
    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido.' });
    }
    
    jwt.verify(tokenWithoutBearer, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado.', user: {id: null}});
      }
  
      // Armazena as informações do usuário decodificado para uso posterior
      console.log(decoded)
      req.user = decoded;
      next();
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

                    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
                    res.send({msg: "Usuário logado com sucesso!", token, login: true, user: {name: result[0].name}})}
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
                    return res.send({msg: "Usuário logado com sucesso!", token, login: true, name})
                })
            })
        } else {
            return res.send({msg: 'Email já cadastrado.'})
        }
    })
}

export {loginUser, registerUser, jwtMiddleware, refreshToken}