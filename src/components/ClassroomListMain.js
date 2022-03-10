import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  VStack,
  Button,
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import ClassBlock from '@/components/ClassBlock'
import React from 'react'
import { useControllableState } from '@chakra-ui/react'


const ClassroomListMain = () => {
  const cl = [];
  var classr;

  const [value, setValue] = React.useState(0)

  const [internalValue, setInternalValue] = useControllableState({
    value,
    onChange: setValue,
  })

  
  /*if(cl.length == 0){
    cl[0] = internalValue
  }
  else{
  for(let i =0; i<cl.length;i++){
    if(cl[i] == null){
    cl[i] = internalValue;
    }
    else{
      continue;
    }
  }
}*/
for(let i = 0; i < internalValue; i++){
  classr = 'Classroom'+(i+1);
  cl[i] = <ClassBlock
  title={classr}
  description="This is a classroom description. It can be a bit long. However, that's ok because we can simply truncate this."
  link='/classroom'
/> ;
}


  return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full' spacing='15px' align='left'>
          <Heading width='full'>Classrooms</Heading>
          <Divider />
          <Spacer />
          {cl}
          <Spacer />
          {/* TODO: FIX THIS DAMN BUTTON STRETCH????? LEFT ALIGN PLEASE FUTURE ME */}
          <Button mt={4} colorScheme='blue' onClick={() => setInternalValue(value+1)}>
            Add Class +
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}

export default ClassroomListMain
