import {
    PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        userEmail
    } = req.query
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            select: {
                id: true
            }
        })
        const teachInfo = await prisma.instructor.findUnique({
            where: {
                userID: user.id
            },
            select: {
                classes: true
            }
        })
        const getData = await Promise.all(teachInfo.classes.map(async (data) => {
            const classInfo = await prisma.class.findUnique({
                where: {
                    id: data.classID
                }
            })
            return classInfo
        }))
        res.json(getData)
    } catch {
        console.log(error)
    }
}