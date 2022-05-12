import { Button, Spacer, VStack } from '@chakra-ui/react'
import AnnouncementBlock from '@/components/AnnouncementBlock'
import { useRouter } from 'next/router'

const Announcements = ({ userData, classData, ...rest }) => {
  const router = useRouter()

  return (
    <VStack>
      {classData.posts.map((post) => {
        return (
          <AnnouncementBlock
            key={post.postID}
            userData={userData}
            title={post.title}
            body={post.body}
            isHidden={post.isHidden}
            link={'/classroom/' + classData.sectionID + '/post/' + post.postID}
          ></AnnouncementBlock>
        )
      })}
      <Spacer />
      <Button
        width='full'
        mt={4}
        colorScheme='blue'
        onClick={() => {
          router.push('/classroom/' + classData.sectionID + '/new-post')
        }}
        style={{ display: userData.isStudent ? 'none' : 'block' }}
      >
        + New Post
      </Button>
    </VStack>
  )
}

export default Announcements
