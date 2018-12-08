import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';
import Home from './Home';

const mapStateToProps = ({ auth }) => {
  const { message, isError } = auth;

  return { isError, message };
};
const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
