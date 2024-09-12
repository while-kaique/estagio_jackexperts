import express from 'express'
import cors from 'cors'

import userRoutes from './routes/users.js'

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Permite apenas esse domínio
    credentials: true // Permite o envio de cookies
}));
app.use("/", userRoutes)

app.listen(8800, () => {
    console.log('Servidor rodando na porta 8800')
})