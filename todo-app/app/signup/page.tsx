"use client";
import axios from "axios";
import { useState } from "react";
export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return <>
    <div className="w-screen h-screen flex items-center justify-center ">
        <div>
            <input type="text" placeholder="username" onChange={e=>{
                setUsername(e.target.value)
            }}/>
            <input type="text" placeholder="password" onChange={e=>{
                setPassword(e.target.value)
            }}/>
            <button onClick={()=>{
                axios.post('http://localhost:3000/api/v1/signup',{
                    username,
                    password
                })
            }}>Sign up</button>
        </div>
    </div>
    
    </>
}