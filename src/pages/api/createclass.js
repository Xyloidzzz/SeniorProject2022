import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  const department = req.query.department
  const term = req.query.term
  const name = req.query.name
  const description = req.query.description
  const isOnline = req.query.isOnline
  const schedule = req.query.schedule
  // TODO: missing attendance JSON we gotta figure out a mold for how to parse it.

  if (department && term && name && description && isOnline && schedule) {
    try {
      await prisma.user.create({
        data: {
          department: department,
          term: term,
          name: name,
          description: description,
          isOnline: isOnline,
          schedule: schedule,
          attendance: JSON.stringify([0]), // TODO: change this
        }
      })
      res.status(200).json({
        serverStat: 200
      })
    } catch (error) {
      res.status(400).json({
        error
      })
    }
  } else {
    res.status(404).json({
      serverStat: 404
    })
  }
}