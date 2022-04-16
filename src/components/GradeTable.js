import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from '@chakra-ui/react'
import GradeCell from '@/components/GradeCell'
import React, { useState } from 'react'

const GradeTable = ({ classData }) => {
  // for (let i = 0; i < assignment.length; i++) {
  //   a[i] = (
  // <Th key={i} isNumeric>
  //   {assignment[i]}
  // </Th>
  //   )
  //   b[i] = (
  // <GradeCell
  //   key={i}
  //   defaultValue='0'
  //   studentName={c[i]}
  //   assignment={assignment[i]}
  // />
  //   )
  // }

  // for (let i = 0; i < c.length; i++) {
  //   s[i] = (
  //     <Tr key={i}>
  //       <Td>{c[i]}</Td>
  //       {b}
  //     </Tr>
  //   )
  // }

  // get assignment title from assignments in classData grades
  const assignmentNames = []
  for (let i = 0; i < classData.grades[0].assignmentInfo.length; i++) {
    assignmentNames.push(classData.grades[0].assignmentInfo[i].title)
  }

  return (
    <Table variant='unstyled'>
      {console.log(classData)}
      <Thead>
        <Tr>
          <Th>Students</Th>
          {assignmentNames.map((val) => (
            <Th key={val}>{val}</Th>
          ))}
          <Th key='finalGrade'>Final Grade</Th>
        </Tr>
      </Thead>
      <Tbody>
        {classData.grades.map((student) => (
          <Tr key={student.studentID}>
            <Td>{student.firstName + ' ' + student.lastName}</Td>
            {student.assignmentInfo.map((assignment) => (
              <GradeCell
                key={student.studentID + assignment.assignmentID}
                classData={classData}
                defaultValue={assignment.grade}
                studentName={student.firstName + ' ' + student.lastName}
                studentID={student.studentID}
                assignmentID={assignment.assignmentID}
              />
            ))}
            <Td>{student.finalGrade}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default GradeTable
