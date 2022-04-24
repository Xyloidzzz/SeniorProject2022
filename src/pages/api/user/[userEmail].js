import {
    PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        userEmail
    } = req.query
    try {
        const getUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
        })
        const isStudent = getUser.role === "STUDENT"
        const isAdmin = getUser.role === "ADMIN"
        const user = {
            id: getUser.id,
            firstName: getUser.firstName,
            lastName: getUser.lastName,
            isStudent,
            isAdmin
        }
        res.json(user)
    } catch {

    }
    //res.json({email:userEmail})
}