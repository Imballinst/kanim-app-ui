import { connect } from 'react-redux';
import NotifDetail from '../components/NotifDetail';

const mapStateToProps = ({ notif, kanim }) => ({ notif, kanim });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotifDetail);
