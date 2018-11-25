import { connect } from 'react-redux';
import { getNotifications, getNotification, deleteNotification } from '../actions/notif';
import List from './Notification';

const mapStateToProps = ({ notif, auth, nav, kanim }) => ({
  notif,
  auth,
  nav,
  kanim
});
const mapDispatchToProps = { getNotifications, getNotification, deleteNotification };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
