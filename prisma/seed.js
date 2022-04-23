const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {

  const newAdmin1 = await prisma.user.create({
    data: {
      email: 'admin@gradeflex.com',
      password: 'admin',
      prefix: 'Mr.',
      firstName: 'Admin',
      lastName: 'User',
      avatar: 'default',
      role: 'ADMIN',
    }
  })
  const newUserInstructor1 = await prisma.user.create({
    data: {
      email: "test123@gmail.com",
      password: "test123",
      prefix: 'Dr',
      firstName: "Test",
      lastName: "Testing",
      avatar: "default",
      role: "INSTRUCTOR",
    }
  })
  const newUserStudent1 = await prisma.user.create({
    data: {
      email: "alfred@gradeflex.com",
      password: "password",
      prefix: 'Mr',
      firstName: "Alfredo",
      lastName: "Pena",
      avatar: "default",
      role: "STUDENT",
    }
  })
  const newUserStudent2 = await prisma.user.create({
    data: {
      email: "jesus@gradeflex.com",
      password: "password",
      prefix: 'Mr',
      firstName: "Jesus",
      lastName: "Mendez",
      avatar: "default",
      role: "STUDENT",
    }
  })
  const newUserStudent3 = await prisma.user.create({
    data: {
      email: "james@gradeflex.com",
      password: "password",
      prefix: 'Mr',
      firstName: "James",
      lastName: "Kim",
      avatar: "default",
      role: "STUDENT",
    }
  })
  const newStudent1 = await prisma.student.create({
    data: {
      id: '20217084',
      registerDate: new Date(),
      isAssistant: false,
      userID: newUserStudent1.id,
    }
  })
  const newStudent2 = await prisma.student.create({
    data: {
      id: '20528094',
      registerDate: new Date(),
      isAssistant: false,
      userID: newUserStudent2.id,
    }
  })
  const newStudent3 = await prisma.student.create({
    data: {
      id: '20632104',
      registerDate: new Date(),
      isAssistant: false,
      userID: newUserStudent3.id,
    }
  })
  const newInstructor1 = await prisma.instructor.create({
    data: {
      id: '10010400',
      officeHours: 'Friday 3-5pm',
      userID: newUserInstructor1.id
    }
  })
  const newClass1 = await prisma.class.create({
    data: {
      id: '15984',
      title: 'Fundamentals of Computer Science',
      description: 'This course is designed to teach the fundamentals of computer science. It will cover the basic concepts of programming. Students will learn how to write programs in C++, Java, and Python. Students will also learn how to use the software development tools, such as Eclipse, Netbeans, and Visual Studio.',
      department: 'CSCI',
      classNum: '1301',
      creditHours: 3,
    }
  })
  const newClass2 = await prisma.class.create({
    data: {
      id: '38593',
      title: 'Data Structures and Algorithms',
      description: 'This course is designed to teach the basic concepts of data structures and algorithms. Students will learn how to use the data structures and algorithms in C++',
      department: 'CSCI',
      classNum: '3333',
      creditHours: 3,
    }
  })
  const newSection1 = await prisma.section.create({
    data: {
      id: '01-' + newClass1.id + '-Fall-2022', // sectionNum-classID-term-year
      classID: newClass1.id,
      fullName: newClass1.department + ' ' + newClass1.classNum + '-01 Fall2022 | ' + newClass1.title,
      sectionNum: '01',
      term: 'Fall',
      year: '2022',
      schedule: 'MWF 9:00am-10:15am',
      isOnline: true,
      isSynchronous: true,
      isAvailable: true,
      gradeWeight: [{
        type: 'Homework',
        weight: 45
      }, {
        type: 'Quiz',
        weight: 25
      }]
    }
  })
  const newSection2 = await prisma.section.create({
    data: {
      id: '01-' + newClass2.id + '-Fall-2022', // sectionNum-classID-term-year
      classID: newClass2.id,
      fullName: newClass2.department + ' ' + newClass2.classNum + '-01 Fall2022 | ' + newClass2.title,
      sectionNum: '01',
      term: 'Fall',
      year: '2022',
      schedule: 'TR 12:30pm-01:45pm',
      isOnline: false,
      isSynchronous: true,
      isAvailable: true,
      gradeWeight: [{
        type: 'Homework',
        weight: 45
      }, {
        type: 'Quiz',
        weight: 25
      }, {
        type: 'Exam',
        weight: 30
      }]
    }
  })
  const newTeachClass1 = await prisma.instructorTeachesSection.create({
    data: {
      id: newInstructor1.id + '-' + newSection1.id,
      instructorID: newInstructor1.id,
      sectionID: newSection1.id,
    }
  })
  const newTeachClass2 = await prisma.instructorTeachesSection.create({
    data: {
      id: newInstructor1.id + '-' + newSection2.id,
      instructorID: newInstructor1.id,
      sectionID: newSection2.id
    }
  })
  const newAssignment1 = await prisma.assignment.create({
    data: {
      title: 'Homework 1',
      description: 'This is homework 1',
      dueDate: '2022-10-24 11:59:59',
      attachments: [],
    }
  })
  const newAssignment2 = await prisma.assignment.create({
    data: {
      title: 'Homework 2',
      description: 'This is homework 2',
      dueDate: '2022-10-26 11:59:59',
      attachments: [],
    }
  })
  const newAssignment3 = await prisma.assignment.create({
    data: {
      title: 'Homework 3',
      description: 'This is homework 3',
      dueDate: '2022-10-28 11:59:59',
      attachments: [],
    }
  })
  const newSectionHasAssignment1 = await prisma.sectionHasAssignment.create({
    data: {
      id: newAssignment1.id + '-' + newSection1.id,
      type: 'Homework',
      weight: 45,
      isHidden: false,
      sectionID: newSection1.id,
      assignmentID: newAssignment1.id,
    }
  })
  const newSectionHasAssignment2 = await prisma.sectionHasAssignment.create({
    data: {
      id: newAssignment2.id + '-' + newSection1.id,
      type: 'Homework',
      weight: 45,
      isHidden: false,
      sectionID: newSection1.id,
      assignmentID: newAssignment2.id,
    }
  })
  const newSectionHasAssignment3 = await prisma.sectionHasAssignment.create({
    data: {
      id: newAssignment3.id + '-' + newSection1.id,
      type: 'Homework',
      weight: 45,
      isHidden: false,
      sectionID: newSection1.id,
      assignmentID: newAssignment3.id,
    }
  })
  const newStudentTakesSection1 = await prisma.studentTakesSection.create({
    data: {
      studentID: newStudent1.id,
      sectionID: newSection1.id,
      attendance: [{
          date: '2022-01-24',
          isPresent: true
        },
        {
          date: '2022-01-26',
          isPresent: true
        },
        {
          date: '2022-01-31',
          isPresent: true
        },
        {
          date: '2022-02-02',
          isPresent: true
        },
      ],
    }
  })
  const newStudentTakesSection2 = await prisma.studentTakesSection.create({
    data: {
      studentID: newStudent2.id,
      sectionID: newSection1.id,
      attendance: [{
          date: '2022-01-24',
          isPresent: true
        },
        {
          date: '2022-01-26',
          isPresent: false
        },
        {
          date: '2022-01-31',
          isPresent: false
        },
        {
          date: '2022-02-02',
          isPresent: false
        },
      ]
    }
  })
  const newStudentTakesSection3 = await prisma.studentTakesSection.create({
    data: {
      studentID: newStudent3.id,
      sectionID: newSection1.id,
      attendance: [{
          date: '2022-01-24',
          isPresent: true
        },
        {
          date: '2022-01-26',
          isPresent: true
        },
        {
          date: '2022-01-31',
          isPresent: false
        },
        {
          date: '2022-02-02',
          isPresent: true
        },
      ]
    }
  })
  const newStudentHasAssignment1 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent1.id + '-' + newAssignment1.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent1.id,
      assignmentID: newAssignment1.id
    }
  })
  const newStudentHasAssignment2 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent1.id + '-' + newAssignment2.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent1.id,
      assignmentID: newAssignment2.id
    }
  })
  const newStudentHasAssignment3 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent1.id + '-' + newAssignment3.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent1.id,
      assignmentID: newAssignment3.id
    }
  })
  const newStudentHasAssignment4 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent2.id + '-' + newAssignment1.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent2.id,
      assignmentID: newAssignment1.id
    }
  })
  const newStudentHasAssignment5 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent2.id + '-' + newAssignment2.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent2.id,
      assignmentID: newAssignment2.id
    }
  })
  const newStudentHasAssignment6 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent2.id + '-' + newAssignment3.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent2.id,
      assignmentID: newAssignment3.id
    }
  })
  const newStudentHasAssignment7 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent3.id + '-' + newAssignment1.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent3.id,
      assignmentID: newAssignment1.id
    }
  })
  const newStudentHasAssignment8 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent3.id + '-' + newAssignment2.id,
      grade: '0',
      comments: 'This is a student comment.',
      studentID: newStudent3.id,
      assignmentID: newAssignment2.id
    }
  })
  const newStudentHasAssignment9 = await prisma.studentHasAssignment.create({
    data: {
      id: newStudent3.id + '-' + newAssignment3.id,
      grade: '0',
      comments: 'This is a student comment.',
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