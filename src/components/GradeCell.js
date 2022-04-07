import {
  Td,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useState } from 'react'

// TODO: need an async funciton here once DB is up to set up connection
// however maybe this will happen better in upper level component
// cause then we might run DB connect a million times

// TODO: Save Button grays out when shit doesn't match DB and onClick will change DB grade for specific assignment

const isValidGrade = (grade) => {
  return grade >= 0 && /[0-9]/.test(grade) ? true : false
}

function updateDB() {
  // here we will sumbit new cell value to DB -> maybe upper component not here
}

const GradeCell = ({ defaultValue, studentName, assignmentID }) => {
  const [value, setValue] = useState(defaultValue)
  const [valid, setValid] = useState(true)

  const submitErrorToast = useToast()

  const EditableInputError = () => {
    if (!valid) {
      return (
        // <Alert status='error' size='sm'>
        //   <AlertIcon />A grade cannot be negative or non-numerical!
        // </Alert>
        <Text color='red.500' p='2'>
          A grade cannot be negative, non-numerical, or empty!
        </Text>
      )
    } else {
      return null
    }
  }

  const onChangeValueListener = (event) => {
    isValidGrade(event.target.value) ? setValid(true) : setValid(false)
    setValue(event.target.value)
  }

  const onCancelValueListener = (prevValue) => {
    isValidGrade(prevValue) ? setValid(true) : setValid(false)
  }

  const onSubmitListener = (nextValue) => {
    if (valid) {
      // update DB
    } else {
      // cancel sumbit or go back to edit
      setValue(0)
      setValid(true)
      submitErrorToast({
        title: 'Invalid Text in Table Cell',
        description:
          'You have input a negative number or non-numerical symbol. We have reset the value to 0. Please try again.',
        status: 'error',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })
      // refresh component if possible
    }
  }

  return (
    <Td isNumeric>
      <Editable
        value={value}
        onSubmit={onSubmitListener}
        onCancel={onCancelValueListener}
      >
        <EditablePreview />
        <EditableInput onChange={onChangeValueListener} />
      </Editable>
      <EditableInputError />
    </Td>
  )
  GradeCell.defaultProps = {
    defaultValue: '0',
  }
}

export default GradeCell
