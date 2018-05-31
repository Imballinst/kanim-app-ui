import { connect } from 'react-redux';

import KanimDetail from '../components/KanimDetail';
import { checkOfficeQuota } from '../actions/kanim';
import { registerQueue } from '../actions/queue';

const mapStateToProps = ({ kanim, auth, queue }) => ({
  auth,
  office: kanim.office,
  getOfficeQuotaAttempt: kanim.getOfficeQuotaAttempt,
  confirmQuotaAttempt: kanim.confirmQuotaAttempt,
  registerQueueAttempt: queue.registerQueueAttempt,
});
const mapDispatchToProps = { checkOfficeQuota, registerQueue };

export default connect(mapStateToProps, mapDispatchToProps)(KanimDetail);
