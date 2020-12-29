import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <Component />
  </>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

// export default NodeBird
export default wrapper.withRedux(withReduxSaga(NodeBird)); // <== thunk 보다 추가됨
// export default wrapper.withRedux(NodeBird) // <== thunk 보다 추가됨
