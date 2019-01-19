import { connect } from 'react-redux';

import Detail from './Detail';
import { confirmOfficeQuota, confirmQuotaSync } from '../../../store/actions/kanim';
import { registerQueue } from '../../../store/actions/queue';
import { addNotification, viewNotifModifySync } from '../../../store/actions/notif';

const mapStateToProps = ({ kanim, auth, queue, notif }) => ({
  auth,
  office: kanim.office,
  confirmation: kanim.confirmation,
  getOfficeQuotaAttempt: kanim.getOfficeQuotaAttempt,
  confirmQuotaAttempt: kanim.confirmQuotaAttempt,
  registerQueueAttempt: queue.registerQueueAttempt,
  addNotificationAttempt: notif.addNotificationAttempt
});
const mapDispatchToProps = {
  confirmOfficeQuota,
  confirmQuotaSync,
  registerQueue,
  addNotification,
  viewNotifModifySync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
