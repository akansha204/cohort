import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json(users);

})

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const user = await client.user.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            todos:true, 
            username:true 
        }
    });
    res.json(user);

})

async function createUser() {
//   await client.user.create({
//     data: {
//       username: "testuser",
//       password:"123123",
//       age: 25,
//       city: "New York",
//     }
//     });

//     await client.user.delete({
//         where: {
//             id:1
//         },
//     });

//     await client.user.update({
//         where: {
//             id:1
//         },
//         data: {
//           username: "updateduser",
//         }
//     });

    // const user = await client.user.findFirst({
    //     where: {
    //         id:1
    //     },
    //     select: {
    //         username:true,  //only give username
    //     }
    // });
    // console.log(user);

    const user = await client.user.findFirst({
        where: {
            id:1
        },
        include: {
            todos:true, 
              
        }
    });
    console.log(user);
}

createUser()
app.listen(3000);