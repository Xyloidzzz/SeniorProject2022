import { Box } from '@chakra-ui/react'
import Head from 'next/head'

const HeadInfo = ({ title, keyword, description, icon }) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta keyword={keyword}></meta>
        <meta name='description' content={description}></meta>
        <link rel='icon' href={icon} />
      </Head>
    </Box>
  )
}
HeadInfo.defaultProps = {
  title: 'Gradebook',
  keyword: 'Login',
  description: 'gradebook system',
  icon: '/grade_icon.ico',
}

export default HeadInfo
