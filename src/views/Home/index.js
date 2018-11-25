import { connect } from 'react-redux';
import { login, refreshLoginView } from '../actions/auth';
import Home from './Home';

const mapStateToProps = ({ auth }) => {
  const { message, isError } = auth;

  return { isError, message };
};
const mapDispatchToProps = { login, refreshLoginView };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
