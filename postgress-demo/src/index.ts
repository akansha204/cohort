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

    const{city, country, street,pincode} = req.body;
    try {
        const insertQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id ;` // to prevent sql injection
        const addressInsertQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);` 

        //transaction concept of dbms
        await pgClient.query("BEGIN;");

        const response = await pgClient.query(insertQuery, [username, password, email]);
        const userId = response.rows[0].id;
        const addressResponse = await pgClient.query(addressInsertQuery, [city, country, street, pincode, userId]);

        await pgClient.query("COMMIT;");


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

//join concept that creates a new table by joining two tables
app.get('/better-metadata', async (req, res) => {
    const id = req.query.id;
    const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode FROM users u JOIN addresses a ON u.id = a.user_id WHERE u.id = $1;`;

    const response = await pgClient.query(query, [id]);
    res.json({
        response: response.rows,
    })
})
app.listen(3000);

