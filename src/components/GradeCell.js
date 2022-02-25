import {
  Td,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const isValidGrade = (grade) => {
  return grade >= 0 && /[0-9]/.test(grade) ? true : false
}

async function valueListener() {
  // here we will check the validity of the value
}

function updateDB() {
  // here we will sumbit new cell value to DB
}

//TODO: WHEN DB IS SET THEN WE CAN FIX THE NEGATIVE NUMBERS HERE FUCK
const GradeCell = ({ defaultValue, studentName, assignment }) => {
  const [value, setValue] = useState(100)
  return (
    <Td isNumeric>
      <Editable defaultValue={defaultValue} onSubmit={updateDB}>
        <EditablePreview />
        <EditableInput onChange={valueListener} />
      </Editable>
    </Td>
  )
  GradeCell.defaultProps = {
    defaultValue: '0',
  }
}

export default GradeCell
