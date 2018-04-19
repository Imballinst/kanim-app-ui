import { StackNavigator } from 'react-navigation';

import Home from '../../containers/Home';
import Detail from '../../containers/Detail';

export default StackNavigator({
  Home: { screen: Home },
  Detail: { screen: Detail },
}, {
  headerMode: 'none',
});
