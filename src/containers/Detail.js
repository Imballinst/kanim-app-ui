import { connect } from 'react-redux';

import Detail from '../components/Detail';
import { confirmQuotaAvailability } from '../actions/kanim';
import { registerQueue } from '../actions/queue';

const mapStateToProps = ({ kanim, auth, queue }) => ({
  auth,
  office: kanim.office,
  getOfficeQuotaAttempt: kanim.getOfficeQuotaAttempt,
  confirmQuotaAttempt: kanim.confirmQuotaAttempt,
  registerQueueAttempt: queue.registerQueueAttempt,
});
const mapDispatchToProps = { confirmQuotaAvailability, registerQueue };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
