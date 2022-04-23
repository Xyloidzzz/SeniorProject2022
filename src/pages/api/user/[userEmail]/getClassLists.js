import {
    PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

// TODO: frontend should use fullName or whatever short form combo they want for display of section.

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
    const checkStudent = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            role: true
        }
    })
    console.log(checkStudent.role)
    //if user is a student
    if (checkStudent.role == "STUDENT") {
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
            console.log(studentInfo)
            //loop through classes array, get each classes id and save each section to getData variable
            const getData = await Promise.all(studentInfo.classes.map(async (data) => {
                const section = await prisma.section.findUnique({
                    where: {
                        id: data.sectionID
                    }
                })
                const classInfo = await prisma.class.findUnique({
                    where: {
                        id: section.classID
                    }
                })
                console.log(classInfo)
                return {
                    sectionID: section.id,
                    classID: section.classID,
                    fullName: section.fullName,
                    title: classInfo.title,
                    description: classInfo.description,
                    department: classInfo.department,
                    classNum: classInfo.classNum,
                    sectionNum: section.sectionNum,
                    term: section.term,
                    year: section.year,
                    creditHours: classInfo.creditHours,
                    schedule: section.schedule,
                    isOnline: section.isOnline,
                    isSynchronous: section.isSynchronous,
                    isAvailable: section.isAvailable,
                }
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
    else if (checkStudent.role == "INSTRUCTOR") {
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
            //iterate through classes array and save the each section info to getData
            const getData = await Promise.all(teachInfo.classes.map(async (data) => {
                const section = await prisma.section.findUnique({
                    where: {
                        id: data.sectionID
                    }
                })
                const classInfo = await prisma.class.findUnique({
                    where: {
                        id: section.classID
                    }
                })
                return {
                    sectionID: section.id,
                    classID: section.classID,
                    fullName: section.fullName,
                    title: classInfo.title,
                    description: classInfo.description,
                    department: classInfo.department,
                    classNum: classInfo.classNum,
                    sectionNum: section.sectionNum,
                    term: section.term,
                    year: section.year,
                    creditHours: classInfo.creditHours,
                    schedule: section.schedule,
                    isOnline: section.isOnline,
                    isSynchronous: section.isSynchronous,
                    isAvailable: section.isAvailable,
                }
            }))
            //send json with classes info and bool to check if student
            res.json({
                classes: getData,
                isStudent: false
            })
        } catch (error) {
            throw new Error('Something went wronng..')
        }
    } else {
        throw new Error('Not Instructor or Student GET OUT')
    }

}