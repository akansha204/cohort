import dotenv from 'dotenv';
dotenv.config();
import {Client} from 'pg';
import express from 'express';
const app = express();

app.use(express.json());
// const pgClient = new Client("connectiom string"); one way

const pgClient = new Client({
    user: process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    host:process.env.POSTGRES_HOST,
    database:process.env.POSTGRES_DB,
    ssl: true,
})
pgClient.connect();

// async function main() {
//     await pgClient.connect();
//     const res = await pgClient.query("UPDATE users SET username = 'Akansha Roy' WHERE id = 1;");
//     console.log(res.rows);
// }
// main();

app.post('/signup', async (req, res) => {
    const {username, password,email} = req.body;
    try {
        const insertQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) ;` // to prevent sql injection
        const response = await pgClient.query(insertQuery, [username, password, email]);
        res.json({
            message:"User created successfully",
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Error creating user",
        })
        
    }

    
})
app.listen(3000);

