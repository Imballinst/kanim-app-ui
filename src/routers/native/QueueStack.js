import { StackNavigator } from 'react-navigation';

import QueueList from '../../containers/QueueList';

export default StackNavigator({
  QueueList: { screen: QueueList },
}, {
  headerMode: 'none',
});
