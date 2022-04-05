const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {

  const newUser = await prisma.user.create({
    data: {
      email: "test123@gmail.com",
      firstName: "test",
      lastName: "testing",
      avatar: "default avatar",
      password: "test123",
      prefix: 'Mr'
    }
  })
  const newInstructor = await prisma.instructor.create({
    data: {
      officeHours: 'Friday 3-5pm',
      userID: newUser.id
    }
  })
  const newClass = await prisma.class.create({
    data: {
      department: 'Computer science department',
      term: 'Fall 2022',
      name: 'CSCI 1101',
      description: 'Fundamentals of computer science',
      isOnline: true,
    }
  })
  const newClass2 = await prisma.class.create({
    data: {
      department: 'Computer science department',
      term: 'Fall 2022',
      name: 'CSCI 3333',
      description: 'Data structure and Algorithm',
      isOnline: false,
    }
  })
  const newTeachClass = await prisma.instructorTeachesClass.create({
    data: {
      instructorID: newInstructor.id,
      classID: newClass.id
    }
  })
  const newTeachClass2 = await prisma.instructorTeachesClass.create({
    data: {
      instructorID: newInstructor.id,
      classID: newClass2.id
    }
  })
  const newAssignment = await prisma.assignment.create({
    data: {
      title: 'Homework 1',
      description: 'This is homework 1',
      dueDate: '2022-05-10T23:59:00-05:00', // ISO 8601 format date string
    }
  })
  const newAssignment2 = await prisma.assignment.create({
    data: {
      title: 'Homework 2',
      description: 'This is homework 2',
      dueDate: '2022-05-16T23:59:00-05:00', // ISO 8601 format date string
    }
  })
  const newAssignment3 = await prisma.assignment.create({
    data: {
      title: 'Homework 3',
      description: 'This is homework 3',
      dueDate: '2022-05-28T23:59:00-05:00', // ISO 8601 format date string
    }
  })
  const newClassHasAssignment = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.id,
      assignmentID: newAssignment.id
    }
  })
  const newClassHasAssignment2 = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.id,
      assignmentID: newAssignment2.id
    }
  })
  const newClassHasAssignment3 = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.is,
      assignmentID: newAssignment3.id
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect)