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
import updateFinalGrade from '../pages/api/grades/updateFinalGrade'
import { useRouter } from 'next/router'

// TODO: Save Button grays out when shit doesn't match DB and onClick will change DB grade for specific assignment


const isValidGrade = (grade) => {
  return grade >= 0 && /[0-9]/.test(grade) ? true : false
}

const GradeCell = ({
  defaultValue,
  classData,
  studentName,
  studentID,
  assignmentID,
}) => {
  const [value, setValue] = useState(defaultValue)
  const [preValue, setPreValue] = useState(defaultValue)
  const [valid, setValid] = useState(true)

  const router = useRouter()
  
  const toast = useToast()

  const updateFinalGrade = async () => {
    // GET request to /api/[classID]/calculateFinalGrade
    const res = await fetch(
      `/api/class/${classData.sectionID}/calculateFinalGrade`
    )
    const data = await res.json()
    if (data.error) {
      console.log(data.message)
    } else {
      // refresh table
      window.location.reload()
    }
  }

  // updateDB
  const updateDB = async (grade) => {
    const response = await fetch('/api/grades/updateGrade', {
      method: 'POST',
      body: JSON.stringify({ studentID, assignmentID, grade }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    // check data response status code
    const serverStatus = data.serverStat
    if (serverStatus == 200) {
      toast({
        title: 'Grade Saved',
        position: 'top',
        status: 'success',
        isClosable: true,
        duration: 2000,
      })
      router.reload(window.location.pathname)
      updateFinalGrade()
    } else {
      toast({
        title: 'Failed to Connect to Database',
        position: 'top',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
      setValue(preValue)
    }
  }

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
    setValue(prevValue)
  }

  const onSubmitListener = (nextValue) => {
    if (isValidGrade(value)) {
      // update DB
      updateDB(value)
    } else {
      // cancel sumbit or go back to edit
      setValue(preValue)
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
