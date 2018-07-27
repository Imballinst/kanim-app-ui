import { connect } from 'react-redux';
import { addNotification } from '../actions/notif';
import NotifModify from '../components/NotifModify';

const mapStateToProps = ({
  notif, kanim, auth, nav,
}) => ({
  notification: notif.notification,
  kanim,
  auth,
  nav,
});
const mapDispatchToProps = { addNotification };

export default connect(mapStateToProps, mapDispatchToProps)(NotifModify);
