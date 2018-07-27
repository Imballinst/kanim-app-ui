import { connect } from 'react-redux';
import { editNotification } from '../actions/notif';
import NotifModify from '../components/NotifModify';

const mapStateToProps = ({
  notif, kanim, auth, nav,
}) => ({
  notification: notif.notification,
  kanim,
  auth,
  nav,
});
const mapDispatchToProps = { editNotification };

export default connect(mapStateToProps, mapDispatchToProps)(NotifModify);
