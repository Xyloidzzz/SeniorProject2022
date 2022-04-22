import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

// TODO: Update frontend [classID] to [sectionID]

export default async function handler(req, res) {
  const {
    sectionID
  } = req.query
  try {
    const findSection = await prisma.section.findUnique({
      where: {
        id: sectionID
      },
      select: {
        id: true,
        classID: true,
        fullName: true,
        sectionNum: true,
        term: true,
        year: true,
        schedule: true,
        isOnline: true,
        isSynchronous: true,
        isAvailable: true,
        gradeWeight: true,
        instructors: true,
        students: true,
        assistants: true,
        assignments: true,
        posts: true,
      }
    })
    const findClass = await prisma.class.findUnique({
      where: {
        id: findSection.classID
      },
      select: {
        id: true,
        title: true,
        description: true,
        department: true,
        classNum: true,
        creditHours: true,
        sections: true,
      }
    })
    const findInstructor = await prisma.instructor.findMany({
      where: {
        id: findSection.instructors.instructorID
      },
      select: {
        id: true,
        officeHours: true,
        userID: true,
      }
    })
    const findInstructorUser = await prisma.user.findMany({
      where: {
        id: findInstructor.userID
      },
      select: {
        id: true,
        email: true,
        prefix: true,
        firstName: true,
        lastName: true,
        avatar: true,
      }
    })
    const instructorInfo = {
      instructorID: findInstructor.id,
      userID: findInstructorUser.id,
      email: findInstructorUser.email,
      prefix: findInstructorUser.prefix,
      firstName: findInstructorUser.firstName,
      lastName: findInstructorUser.lastName,
      avatar: findInstructorUser.avatar,
      officeHours: findInstructor.officeHours,
    }
    const findStudents = await Promise.all(findSection.students.map(async (studentRelation) => {
      const findStudent = await prisma.student.findUnique({
        where: {
          id: studentRelation.studentID
        },
        select: {
          id: true,
          userID: true,
          registerDate: true,
          isAssistant: true,
        }
      })
      const findStudentUser = await prisma.user.findUnique({
        where: {
          id: findStudent.userID
        },
        select: {
          id: true,
          email: true,
          prefix: true,
          firstName: true,
          lastName: true,
          avatar: true,
        }
      })
      const studentInfo = {
        studentID: findStudent.id,
        userID: findStudentUser.id,
        email: findStudentUser.email,
        prefix: findStudentUser.prefix,
        firstName: findStudentUser.firstName,
        lastName: findStudentUser.lastName,
        avatar: findStudentUser.avatar,
        registerDate: findStudent.registerDate,
        isAssistant: findStudent.isAssistant,
      }
      return studentInfo
    }))
    // TODO: assistants, assignments, posts individual queries (whenever they become relevant)
    const data = {
      sectionID: findSection.id,
      classID: findSection.classID,
      fullName: findSection.fullName,
      title: findClass.title,
      description: findClass.description,
      department: findClass.department,
      classNum: findClass.classNum,
      sectionNum: findSection.sectionNum,
      term: findSection.term,
      year: findSection.year,
      creditHours: findClass.creditHours,
      schedule: findSection.schedule,
      isOnline: findSection.isOnline,
      isSynchronous: findSection.isSynchronous,
      isAvailable: findSection.isAvailable,
      gradeWeight: findSection.gradeWeight,
      instructor: instructorInfo,
      students: findStudents,
      assistants: findSection.assistants,
      assignments: findSection.assignments,
      posts: findSection.posts,
      allClassSections: findClass.sections,
    }
    res.json(data)
  } catch {
    console.log(error)
    res.status(500).json({
      error
    })
  }
}