import { connect } from 'react-redux';
import { getNotifications } from '../actions/notif';
import NotifList from '../components/NotifList';

const mapStateToProps = ({
  notif, auth, nav, kanim,
}) => ({
  notif,
  auth,
  nav,
  kanim,
});
const mapDispatchToProps = { getNotifications };

export default connect(mapStateToProps, mapDispatchToProps)(NotifList);
