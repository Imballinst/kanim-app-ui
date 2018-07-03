import { connect } from 'react-redux';
import { addNotification } from '../actions/notif';
import NotifModify from '../components/NotifModify';

const mapStateToProps = ({ notif, kanim, auth }) => ({ notif, kanim, auth });
const mapDispatchToProps = { addNotification };

export default connect(mapStateToProps, mapDispatchToProps)(NotifModify);
