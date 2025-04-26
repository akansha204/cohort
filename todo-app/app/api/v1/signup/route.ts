import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from '../../../lib/db' 

export async function POST(req:NextRequest){
    const data = await req.json();

    await prisma.user.create({
        data:{
            username: data.username,
            password: data.password,
        }
    
    })

    return NextResponse.json({
        message: "You have been signed up",
    })
}

export async function GET(req:NextRequest){
    const users = await prisma.user.findFirst();
    return NextResponse.json({
        users: users,
    })
}