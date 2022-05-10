import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

// TODO: This needs review once admin tools are added. Sign Up is now obsolete.
// TODO: This should now be createStudent and a new route newInstructor

async function newUser(id, firstname, lastname, Email, Password, Avatar, section_ID, Prefix, Role, OfficeHours, Assistant, res) {
  if (firstname && lastname && Email && Password && Avatar) {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: Email
      }
    })
    if (!checkUser) {
      try {
        const newUser = await prisma.user.create({
          data: {
            email: Email,
            password: Password,
            firstName: firstname,
            lastName: lastname,
            avatar: Avatar,
            prefix: Prefix,
            role: Role
          }
        })
        if(Role == "INSTRUCTOR"){
          await prisma.instructor.create({
            data:{
              id: id,
              userID: newUser.id,
              officeHours: OfficeHours
            }
          })
        }
        else{
          if(Assistant == "true"){
            Assistant = true
          }
          else{
            Assistant = false
          }
          console.log(newUser.id)
          await prisma.student.create({
            data:{
              id: id,
              userID: newUser.id,
              isAssistant: Assistant,
              registerDate: ''
            }
          })
        }
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
              id: id,
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

  const id = req.body.id
  const firstname = req.body.firstName
  const lastname = req.body.lastName
  const Email = req.body.email
  const Avatar = 'default'
  const Password = req.body.password
  const sectionID = req.body.sectionID
  const prefix = req.body.prefix
  const role = req.body.role
  const officeHours = req.body.officeHours
  const assistant = req.body.assist

  console.log(prefix)
  console.log(role)
  console.log(officeHours)

  if (!sectionID) {
    if(role=="INSTRUCTOR"){
      newUser(id, firstname, lastname, Email, Password, Avatar, '', prefix, role, officeHours, " ",res)
    }
    else{
      newUser(id, firstname, lastname, Email, Password, Avatar, '', prefix, role, " ", assistant ,res)
    }
    // else{
    //   newUser(firstname, lastname, Email, Password, Avatar, '', 'unknown', role, res)
    // }
  } else {
    if(prefix){
      newUser(id, firstname, lastname, Email, Password, Avatar, sectionID, prefix, role, res)
    }
    // else{
    //   newUser(firstname, lastname, Email, Password, Avatar, sectionID, 'unknown', role, res)
    // }
    
  }

}