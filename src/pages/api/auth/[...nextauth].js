import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient()

export default NextAuth({
    providers:[
        CredentialsProvider ({
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req){
                try{
                    const user = await prisma.user.findUnique({
                        where:{
                            email: String(credentials.email)
                        }
                    })
                    if(user){
                        // console.log(credentials.password)
                            if(user.password==credentials.password){
                                return {fname: user.firstName, lname: user.lastName, email: user.email}
                            }
                            else{
                                throw new Error ('Could not login')
                            }
                        }
                    else{
                        throw new Error('No user found!')
                    }
                }catch (error){
                    throw new Error('Something went wronng..')
                }
            }
        })
    ]
})