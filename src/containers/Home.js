import { connect } from 'react-redux';
import { getListKanim, getOfficeQuota } from '../actions/kanim';
import Home from '../components/Home';

const mapStateToProps = ({ kanim, auth }) => ({
  kanim,
  auth,
});
const mapDispatchToProps = { getListKanim, getOfficeQuota };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
