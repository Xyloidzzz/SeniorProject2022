import { Box, Button, Spacer, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import AssignmentBlock from '@/components/AssignmentBlock'

const Assignments = ({ userData, classData, ...rest }) => {
  const router = useRouter()

  const getFinalGrade = () => {
    // find finalGrade in classData.grades based on userID
    const finalGrade = classData.grades.find(
      (grade) => grade.userID === userData.id
    )
    if (finalGrade) {
      return parseFloat(finalGrade.finalGrade).toFixed(2)
    } else {
      return 'Not Available'
    }
  }

  return (
    <VStack>
      {classData.assignments.map((assignment) => {
        return (
          <AssignmentBlock
            key={assignment.assignmentID}
            userData={userData}
            classData={classData}
            title={assignment.title}
            description={assignment.description}
            isHidden={assignment.isHidden}
            assignmentID={assignment.assignmentID}
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
      <Box
        width='full'
        mt={4}
        style={{ display: !userData.isStudent ? 'none' : 'block' }}
      >
        <Text fontWeight='bold'>Final Grade:</Text>
        {getFinalGrade()}
      </Box>
    </VStack>
  )
}

export default Assignments
