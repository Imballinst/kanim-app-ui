import { connect } from 'react-redux';
import { getOffices, getOffice } from '../actions/kanim';
import KanimList from '../components/KanimList';

const mapStateToProps = ({ kanim, auth }) => ({
  kanim,
  auth,
});
const mapDispatchToProps = { getOffices, getOffice };

export default connect(mapStateToProps, mapDispatchToProps)(KanimList);
