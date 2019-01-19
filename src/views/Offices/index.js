import { connect } from 'react-redux';
import { getOffices } from '../../store/actions/kanim';
import Offices from './Offices';

const mapStateToProps = ({ auth, kanim }) => {
  return { auth, kanim };
};
const mapDispatchToProps = { getOffices };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offices);
