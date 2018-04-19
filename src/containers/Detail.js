import { connect } from 'react-redux';
import Detail from '../components/Detail';

const mapStateToProps = ({ kanim }) => ({
  office: kanim.office,
  getOfficeQuotaAttempt: kanim.getOfficeQuotaAttempt,
});

export default connect(mapStateToProps)(Detail);
