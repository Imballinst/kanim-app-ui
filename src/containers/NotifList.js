import { connect } from 'react-redux';
import { getNotifications, getNotification, deleteNotification } from '../actions/notif';
import NotifList from '../components/NotifList';

const mapStateToProps = ({
  notif, auth, nav, kanim,
}) => ({
  notif,
  auth,
  nav,
  kanim,
});
const mapDispatchToProps = { getNotifications, getNotification, deleteNotification };

export default connect(mapStateToProps, mapDispatchToProps)(NotifList);
