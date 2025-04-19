import dotenv from 'dotenv';
dotenv.config();
import {Client} from 'pg';

// const pgClient = new Client("connectiom string"); one way

const pgClient = new Client({
    user: process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    host:process.env.POSTGRES_HOST,
    database:process.env.POSTGRES_DB,
    ssl: true,
})

async function main() {
    await pgClient.connect();
    const res = await pgClient.query("UPDATE users SET username = 'Akansha Roy' WHERE id = 1;");
    console.log(res.rows);
}
main();