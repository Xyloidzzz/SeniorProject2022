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
      instructorID: newInstructor.instructorID,
      classID: newClass.classID
    }
  })
  const newTeachClass2 = await prisma.instructorTeachesClass.create({
    data: {
      instructorID: newInstructor.instructorID,
      classID: newClass2.classID
    }
  })
  const newAssignment = await prisma.assignment.create({
    data: {
      title: 'Homework 1',
      description: 'This is homework 1',
      dueDate: '2022-05-10', //yyyy-mm-dd
    }
  })
  const newAssignment2 = await prisma.assignment.create({
    data: {
      title: 'Homework 2',
      description: 'This is homework 2',
      dueDate: '2022-05-16', //yyyy-mm-dd
    }
  })
  const newAssignment3 = await prisma.assignment.create({
    data: {
      title: 'Homework 3',
      description: 'This is homework 3',
      dueDate: '2022-05-28', //yyyy-mm-dd
    }
  })
  const newClassHasAssignment = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.classID,
      assignmentID: newAssignment.assignmentID
    }
  })
  const newClassHasAssignment2 = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.classID,
      assignmentID: newAssignment2.assignmentID
    }
  })
  const newClassHasAssignment3 = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.classID,
      assignmentID: newAssignment3.assignmentID
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect)