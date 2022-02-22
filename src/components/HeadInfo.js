import Head from 'next/head'
const HeadInfo = ({ title, keyword, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta keyword={keyword}></meta>
        <meta description={description}></meta>
      </Head>
    </div>
  )
}
HeadInfo.defaultProps = {
  title: 'Gradebook',
  keyword: 'Login',
  contents: 'gradebook system',
}

export default HeadInfo
