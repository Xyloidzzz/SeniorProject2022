import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient()

let user

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
                    user = await prisma.user.findUnique({
                        where:{
                            email: String(credentials.email)
                        }
                    })
                    if(user){
                        // console.log(credentials.password)
                            if(user.password==credentials.password){
                                return {name: user.firstName + ' ' + user.lastName, email: user.email}
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
    ],
    secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
    session:{   
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token}){
            return token
        }
    },
    async session({session, token, user}){
        return session
    }
})

