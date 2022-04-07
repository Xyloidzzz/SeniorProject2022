import {
    PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        userEmail
    } = req.query
    //get user id
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: {
            id: true
        }
    })
    //check user student or instructor
    const checkStudent = await prisma.student.findUnique({
        where: {
            userID: user.id
        },
        select: {
            id: true
        }
    })
    //if user is a student
    if (checkStudent) {
        try {
            //save classes array into studentInfo
            const studentInfo = await prisma.student.findUnique({
                where: {
                    userID: user.id
                },
                select: {
                    classes: true
                }
            })
            //loop through classes array, get each classes id and save each class to getData variable
            const getData = await Promise.all(studentInfo.classes.map(async (data) => {
                const classInfo = await prisma.class.findUnique({
                    where: {
                        id: data.classID
                    },
                })
                return classInfo
            }))
            //send json with classes info and bool to check if student
            res.json({
                classes: getData,
                isStudent: true
            })
        } catch (error) {
            throw new Error('Something went wronng..')
        }
    }
    //if the user is instructor
    else {
        try {
            //get classes array
            const teachInfo = await prisma.instructor.findUnique({
                where: {
                    userID: user.id
                },
                select: {
                    classes: true
                }
            })
            //iterate through classes array and save the each class info to getData
            const getData = await Promise.all(teachInfo.classes.map(async (data) => {
                const classInfo = await prisma.class.findUnique({
                    where: {
                        id: data.classID
                    }
                })
                return classInfo
            }))
            //send json with classes info and bool to check if student
            res.json({
                classes: getData,
                isStudent: false
            })
        } catch (error) {
            throw new Error('Something went wronng..')
        }
    }

}