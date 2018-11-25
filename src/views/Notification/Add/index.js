import { connect } from 'react-redux';
import { addNotification } from '../actions/notif';
import Add from './Add';

const mapStateToProps = ({ notif, kanim, auth, nav }) => ({
  notification: notif.notification,
  kanim,
  auth,
  nav
});
const mapDispatchToProps = { addNotification };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
