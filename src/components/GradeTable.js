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

const GradeTable = (data) => {
  console.log(data.rows)
  console.log(data.col)

  return (
    <Table variant='unstyled'>
      <Thead>
        <Tr>
          <Th>Students</Th>
          <Th isNumeric>HW 1</Th>
          <Th isNumeric>Exam 1</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Alfredo Pena</Td>
          <GradeCell
            defaultValue='100'
            studentName='Alfredo Pena'
            assignment='HW 1'
          />
          <GradeCell
            defaultValue='100'
            studentName='Alfredo Pena'
            assignment='Exam 1'
          />
        </Tr>
        <Tr>
          <Td>Jesus Mendez</Td>
          <GradeCell
            defaultValue='100'
            studentName='Jesus Mendez'
            assignment='HW 1'
          />
          <GradeCell
            defaultValue='100'
            studentName='Jesus Mendez'
            assignment='Exam 1'
          />
        </Tr>
        <Tr>
          <Td>Jaehun Kim</Td>
          <GradeCell
            defaultValue='100'
            studentName='Jaehun Kim'
            assignment='HW 1'
          />
          <GradeCell
            defaultValue='100'
            studentName='Jaehun Kim'
            assignment='Exam 1'
          />
        </Tr>
      </Tbody>
    </Table>
  )
}

export default GradeTable
