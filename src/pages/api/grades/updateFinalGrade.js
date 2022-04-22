// import {
//   PrismaClient
// } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const studentID = req.query.studentID
//   const sectionID = req.query.sectionID
//   const finalGrade = req.query.finalGrade

//   if (studentID && sectionID && finalGrade) {
//     try {
//       await prisma.studentTakesSection.updateMany({
//         where: {
//           studentID: studentID,
//           sectionID: sectionID
//         },
//         data: {
//           finalGrade: finalGrade
//         },
//       })
//       res.status(200).json({
//         serverStat: 200
//       })
//     } catch (error) {
//       res.status(400).json({
//         error
//       })
//     }
//   }
// }