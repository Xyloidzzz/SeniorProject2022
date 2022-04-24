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
  console.log(classData.grades.length)

  classData.grades.sort((a, b) => {
    if (a.firstName < b.firstName) {
      return -1
    }
    if (a.firstName > b.firstName) {
      return 1
    }
    return 0
  })

  // get assignment title from assignments in classData grades
  const assignmentNames = []
  if (classData.grades.length > 0) {
    for (let i = 0; i < classData.grades[0].assignmentInfo.length; i++) {
      assignmentNames.push(classData.grades[0].assignmentInfo[i].title)
    }
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
