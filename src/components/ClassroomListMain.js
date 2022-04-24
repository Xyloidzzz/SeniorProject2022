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

const ClassroomListMain = ({ classLists }) => {
  classLists.classes.map((val) => {
    console.log(val.fullName)
  })

  return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full' spacing='15px' align='left'>
          <Heading width='full'>Classrooms</Heading>
          <Divider />
          <Spacer />
          {classLists.classes.map((val) => {
            return (
              <ClassBlock
                key={val.id}
                title={val.fullName}
                description={val.description}
                link={'/classroom/' + val.sectionID}
              ></ClassBlock>
            )
          })}
          <Spacer />
        </VStack>
      </Box>
    </Flex>
  )
}

export default ClassroomListMain
