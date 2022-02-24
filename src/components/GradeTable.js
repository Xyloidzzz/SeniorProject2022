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
} from '@chakra-ui/react'

const GradeTable = () => {
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
          <Td isNumeric>
            <Editable defaultValue='100'>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
          <Td isNumeric>
            <Editable defaultValue='100'>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
        </Tr>
        <Tr>
          <Td>Jesus Mendez</Td>
          <Td isNumeric>
            <Editable defaultValue='100'>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
          <Td isNumeric>
            <Editable defaultValue='100'>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
        </Tr>
        <Tr>
          <Td>Jaehun Kim</Td>
          <Td isNumeric>
            <Editable defaultValue='100'>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
          <Td isNumeric>
            <Editable defaultValue='100'>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default GradeTable
