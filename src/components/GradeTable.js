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

const GradeTable = ({ tarea, tipo, classData }) => {
  const numi = tarea.length + 1

  const assignment = []
  const AssignmentType = []
  const a = []
  const b = []
  const c = [
    'Alfredo Pena',
    'Jesus Mendez',
    'Jaehun Kim',
    'John Doe',
    'Diego Rivera',
    'Peter Parker',
    'Nathan Drake',
  ]
  const s = []

  assignment.push(tarea)
  AssignmentType.push(tipo)

  for (let i = 0; i < assignment.length; i++) {
    a[i] = (
      <Th key={i} isNumeric>
        {assignment[i]}
      </Th>
    )
    b[i] = (
      <GradeCell
        key={i}
        defaultValue='0'
        studentName={c[i]}
        assignment={assignment[i]}
      />
    )
  }

  for (let i = 0; i < c.length; i++) {
    s[i] = (
      <Tr key={i}>
        <Td>{c[i]}</Td>
        {b}
      </Tr>
    )
  }

  return (
    <Table variant='unstyled'>
      {console.log(classData)}
      <Thead>
        <Tr>
          <Th>Students</Th>
          {a}
        </Tr>
      </Thead>
      <Tbody>{s}</Tbody>
    </Table>
  )
}

export default GradeTable
