import { connect } from 'react-redux';

import KanimDetail from '../components/KanimDetail';
import { confirmOfficeQuota, confirmQuotaSync } from '../actions/kanim';
import { registerQueue } from '../actions/queue';

const mapStateToProps = ({ kanim, auth, queue }) => ({
  auth,
  office: kanim.office,
  confirmation: kanim.confirmation,
  getOfficeQuotaAttempt: kanim.getOfficeQuotaAttempt,
  confirmQuotaAttempt: kanim.confirmQuotaAttempt,
  registerQueueAttempt: queue.registerQueueAttempt,
});
const mapDispatchToProps = { confirmOfficeQuota, confirmQuotaSync, registerQueue };

export default connect(mapStateToProps, mapDispatchToProps)(KanimDetail);
