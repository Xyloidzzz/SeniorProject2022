const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {

  const newUser = await prisma.user.create({
    data: {
      email: "test123@gmail.com",
      firstName: "Test",
      lastName: "Testing",
      avatar: "default",
      password: "test123",
      prefix: 'Dr'
    }
  })
  const newUser2 = await prisma.user.create({
    data: {
      email: "alfred@gradeflex.com",
      firstName: "Alfredo",
      lastName: "Pena",
      avatar: "default",
      password: "password",
      prefix: 'Mr'
    }
  })
  const newUser3 = await prisma.user.create({
    data: {
      email: "jesus@gradeflex.com",
      firstName: "Jesus",
      lastName: "Mendez",
      avatar: "default",
      password: "password",
      prefix: 'Mr'
    }
  })
  const newUser4 = await prisma.user.create({
    data: {
      email: "james@gradeflex.com",
      firstName: "James",
      lastName: "Kim",
      avatar: "default",
      password: "password",
      prefix: 'Mr'
    }
  })
  const newStudent = await prisma.student.create({
    data: {
      registerDate: new Date(),
      userID: newUser2.id,
    }
  })
  const newStudent2 = await prisma.student.create({
    data: {
      registerDate: new Date(),
      userID: newUser3.id,
    }
  })
  const newStudent3 = await prisma.student.create({
    data: {
      registerDate: new Date(),
      userID: newUser4.id,
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
      gradeWeight: {
        'Homework': 0.45,
      },
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
      assignmentID: newAssignment.id,
      type: 'Homework',
      weight: 0.45,
    }
  })
  const newClassHasAssignment2 = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.id,
      assignmentID: newAssignment2.id,
      type: 'Homework',
      weight: 0.45,
    }
  })
  const newClassHasAssignment3 = await prisma.classHasAssignment.create({
    data: {
      isHidden: false,
      classID: newClass.is,
      assignmentID: newAssignment3.id,
      type: 'Homework',
      weight: 0.45,
    }
  })
  const newStudentTakesClass = await prisma.studentTakesClass.create({
    data: {
      studentID: newStudent.id,
      classID: newClass.id,
      finalGrade: '100',
      attendance: {
        '2022-01-24': '1',
        '2022-01-26': '1',
        '2022-01-31': '1',
        '2022-02-02': '1',
      },
    }
  })
  const newStudentTakesClass2 = await prisma.studentTakesClass.create({
    data: {
      studentID: newStudent2.id,
      classID: newClass.id,
      finalGrade: '100',
      attendance: {
        '2022-01-24': '1',
        '2022-01-26': '0',
        '2022-01-31': '0',
        '2022-02-02': '0',
      },
    }
  })
  const newStudentTakesClass3 = await prisma.studentTakesClass.create({
    data: {
      studentID: newStudent3.id,
      classID: newClass.id,
      finalGrade: '100',
      attendance: {
        '2022-01-24': '1',
        '2022-01-26': '1',
        '2022-01-31': '0',
        '2022-02-02': '1',
      },
    }
  })
  const newStudentHasAssignment = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent.id,
      assignmentID: newAssignment.id
    }
  })
  const newStudentHasAssignment2 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent.id,
      assignmentID: newAssignment2.id
    }
  })
  const newStudentHasAssignment3 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent.id,
      assignmentID: newAssignment3.id
    }
  })
  const newStudentHasAssignment4 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent2.id,
      assignmentID: newAssignment.id
    }
  })
  const newStudentHasAssignment5 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent2.id,
      assignmentID: newAssignment2.id
    }
  })
  const newStudentHasAssignment6 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent2.id,
      assignmentID: newAssignment3.id
    }
  })
  const newStudentHasAssignment7 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent3.id,
      assignmentID: newAssignment.id
    }
  })
  const newStudentHasAssignment8 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent3.id,
      assignmentID: newAssignment2.id
    }
  })
  const newStudentHasAssignment9 = await prisma.studentHasAssignment.create({
    data: {
      grade: '100',
      comments: 'This is a comment.',
      studentID: newStudent3.id,
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