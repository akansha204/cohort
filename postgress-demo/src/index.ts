import {Client} from 'pg';

// const pgClient = new Client("connectiom string"); one way

const pgClient = new Client({
    user:"neondb_owner",
    password:"npg_HQz6cFYMe3Ps",
    port:5432,
    host:"ep-old-band-a4ny0cxq-pooler.us-east-1.aws.neon.tech",
    database:"neondb",
    ssl: true,
})

async function main() {
    await pgClient.connect();
    const res = await pgClient.query("UPDATE users SET username = 'Akansha Roy' WHERE id = 1;");
    console.log(res.rows);
}
main();