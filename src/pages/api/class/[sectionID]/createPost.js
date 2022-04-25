import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    sectionID
  } = req.query
  const title = req.body.title
  const body = req.body.body
  const isHidden = req.body.isHidden

  if (req.method === "POST") {
    if (title && body) {
      try {
        const newPost = await prisma.post.create({
          data: {
            title,
            body,
            attachments: [],
          }
        })
        const newPostRelation = await prisma.sectionHasPost.create({
          data: {
            sectionID,
            postID: newPost.id,
            isHidden: isHidden ? true : false,
          }
        })
        const postInfo = {
          id: newPost.id,
          title: newPost.title,
          body: newPost.body,
          isHidden: newPostRelation.isHidden,
        }
        res.status(200).json({
          serverStatus: 200,
          postInfo
        })
      } catch (error) {
        res.status(500).json({
          serverStatus: 500,
          message: 'Could not access database'
        })
      }
    } else {
      res.status(400).json({
        serverStatus: 400,
        message: 'Missing title or body.'
      })
    }
  } else {
    res.status(405).json({
      serverStatus: 405,
      message: 'Method not allowed'
    })
  }

}