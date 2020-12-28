import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import Head from 'next/head'
import wrapper from '../store/configureStore'

const NodeBird = ({Component}) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <meta charSet="utf-8"></meta>
      </Head>      
      <Component />
    </>
  )
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired
}

// export default NodeBird
export default wrapper.withRedux(NodeBird)