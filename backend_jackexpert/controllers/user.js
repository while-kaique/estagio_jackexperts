import { db } from '../db.js'
const getUsers = (_, res) => {
    console.log('passou aqui')
    const q = "SELECT * FROM taskmaneger_db.users"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

            return res.status(200).json(data)
    })
}
export default getUsers