import { connect } from 'react-redux';

import KanimDetail from '../components/KanimDetail';
import { confirmOfficeQuota, confirmQuotaSync } from '../actions/kanim';
import { registerQueue } from '../actions/queue';
import { addNotification } from '../actions/notif';

const mapStateToProps = ({
  kanim, auth, queue, notif,
}) => ({
  auth,
  office: kanim.office,
  confirmation: kanim.confirmation,
  getOfficeQuotaAttempt: kanim.getOfficeQuotaAttempt,
  confirmQuotaAttempt: kanim.confirmQuotaAttempt,
  registerQueueAttempt: queue.registerQueueAttempt,
  addNotificationAttempt: notif.addNotificationAttempt,
});
const mapDispatchToProps = {
  confirmOfficeQuota,
  confirmQuotaSync,
  registerQueue,
  addNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(KanimDetail);
