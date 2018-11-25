import { connect } from 'react-redux';
import { getQueues, cancelQueue } from '../actions/queue';
import QueueList from '../components/QueueList';

const mapStateToProps = ({ queue, auth }) => ({
  queue,
  auth,
});
const mapDispatchToProps = { getQueues, cancelQueue };

export default connect(mapStateToProps, mapDispatchToProps)(QueueList);
