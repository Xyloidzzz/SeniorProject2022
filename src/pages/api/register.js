import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

// TODO: This needs review once admin tools are added. Sign Up is now obsolete.
// TODO: This should now be createStudent and a new route newInstructor

async function newUser(firstname, lastname, Email, Password, Avatar, section_ID, res) {
  if (firstname && lastname && Email && Password && Avatar) {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: Email
      }
    })
    if (!checkUser) {
      try {
        await prisma.user.create({
          data: {
            email: Email,
            password: Password,
            firstName: firstname,
            lastName: lastname,
            avatar: Avatar,
            prefix: 'default'
          }
        })
        if (section_ID) {
          //find new user id based on email
          const user = await prisma.user.findUnique({
            where: {
              email: Email
            },
            select: {
              id: true
            }
          })
          console.log(user.id)
          //create new student with user id
          // TODO: Send a isAssistant variable with JSON admin tools (make relation)
          await prisma.student.create({
            data: {
              registerDate: new Date(),
              userID: user.id
            }
          })
          //get student id with userID
          const student = await prisma.student.findUnique({
            where: {
              userID: user.id
            },
            select: {
              id: true
            }
          })
          console.log(student.id)
          //create student takes section with sectionID variable
          // TODO: get attendace structure from section
          await prisma.studentTakesSection.create({
            data: {
              studentID: student.id,
              sectionID: section_ID,
            }
          })
        }

        res.status(200).json({
          serverStat: 200
        })
      } catch (error) {
        res.status(500).json({
          error
        })
      }
    } else {
      res.status(404).json({
        serverStat: 404
      })
    }
  } else {
    res.status(400).json({
      serverStat: 400
    })
  }
}

export default async function handler(req, res) {

  const firstname = req.body.firstName
  const lastname = req.body.lastName
  const Email = req.body.email
  const Avatar = 'default'
  const Password = req.body.password
  const sectionID = req.body.sectionID

  if (!sectionID) {
    newUser(firstname, lastname, Email, Password, Avatar, '', res)
  } else {
    newUser(firstname, lastname, Email, Password, Avatar, sectionID, res)
  }

}