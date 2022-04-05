const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  
  const newUser = await prisma.user.create({
    data: {
        email:"test123@gmail.com",
        firstName:"test",
        lastName:"testing",
        avatar:"default avatar",
        password:"test123",
        prefix: 'Mr'
      }
  })
  const newInstructor = await prisma.instructor.create({
    data:{
      officeHours: 'Friday 3-5pm',
      userID: newUser.id
    }
  })
  const newClass = await prisma.class.create({
    data:{
      department:'Computer science department',
      term: 'Fall 2022',
      name: 'CSCI 1101',
      description: 'Fundamentals of computer science',
      isOnline: true,
    }
  })
  const newClass2 = await prisma.class.create({
    data:{
      department:'Computer science department',
      term: 'Fall 2022',
      name: 'CSCI 3333',
      description: 'Data structure and Algorithm',
      isOnline: false,
    }
  })
  const newTeachClass = await prisma.instructorTeachesClass.create({
    data:{
      instructorID: newInstructor.instructorID,
      classID: newClass.classID
    }
  })
  const newTeachClass2 = await prisma.instructorTeachesClass.create({
    data:{
      instructorID: newInstructor.instructorID,
      classID: newClass2.classID
    }
  })
}

main()
  .catch((e)=>{
    console.error(e);
    process.exit(1);
  })
  .finally(async()=>await prisma.$disconnect)