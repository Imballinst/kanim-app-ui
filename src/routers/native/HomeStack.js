import { StackNavigator } from 'react-navigation';

import KanimList from '../../containers/KanimList';
import KanimDetail from '../../containers/KanimDetail';

export default StackNavigator({
  KanimList: { screen: KanimList },
  KanimDetail: { screen: KanimDetail },
}, {
  headerMode: 'none',
});
