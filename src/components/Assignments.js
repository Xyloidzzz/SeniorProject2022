import { Button, Spacer, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import AssignmentBlock from '@/components/AssignmentBlock'

const Assignments = ({ userData, classData, ...rest }) => {
  const router = useRouter()

  return (
    <VStack>
      {classData.assignments.map((assignment) => {
        return (
          <AssignmentBlock
            key={assignment.assignmentID}
            userData={userData}
            title={assignment.title}
            description={assignment.description}
            isHidden={assignment.isHidden}
            link={
              '/classroom/' +
              classData.sectionID +
              '/assignment/' +
              assignment.assignmentID
            } // TODO: this link should lead to a full assignment page with data about the assignments and maybe graphs on how students are doing? or even reviewing submissions and settings grades from there too.
          ></AssignmentBlock>
        )
      })}
      <Spacer />
      <Button
        width='full'
        mt={4}
        colorScheme='blue'
        onClick={() => {
          router.push('/classroom/' + classData.sectionID + '/new-assignment')
        }}
        style={{ display: userData.isStudent ? 'none' : 'block' }}
      >
        + New Assignment
      </Button>
    </VStack>
  )
}

export default Assignments
