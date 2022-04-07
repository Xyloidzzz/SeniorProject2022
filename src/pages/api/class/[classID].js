import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    classID
  } = req.query
  try {
    const findClass = await prisma.class.findUnique({
      where: {
        id: classID
      },
      select: {
        department: true,
        term: true,
        name: true,
        description: true,
        isOnline: true,
        schedule: true,
        assignments: true,
        students: true,
        assignments: true,
        posts: true,
      }
    })
    res.json(findClass)
  } catch {

  }
}