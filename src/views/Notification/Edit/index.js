import { connect } from 'react-redux';

import Edit from './Edit';
import { confirmOfficeQuota, confirmQuotaSync } from '../actions/kanim';
import { registerQueue } from '../actions/queue';
import { addNotification, viewNotifModifySync } from '../actions/notif';

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
)(Edit);
