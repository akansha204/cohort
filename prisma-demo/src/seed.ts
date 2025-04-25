import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createDummyUsers(){
    let user =  await client.user.create({
        data:{
            username: "testuser222",
            age:21,
            password:"123123",
            city:"New York",
            todos:{
                create:{
                    description:"test todo",
                    title:"test todo",
                    done:false,
                }
                    
            }
            
        }
    })
}