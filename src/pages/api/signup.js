import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' })
  }

  const newUserData = JSON.parse(req.body)

  const savedUser = await prisma.contact.create({
    data: newUserData,
  })

  res.status(200).json(savedUser)
}
