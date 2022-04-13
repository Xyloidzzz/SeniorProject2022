// // update class gradeWeight with new "type: weight" json field
// const updateClass = await prisma.class.update({
//   where: {
//     id: classID
//   },
//   data: {
//     gradeWeight: {
//       create: {
//         type: type,
//         weight: weight
//       }
//     }
//   }
// })