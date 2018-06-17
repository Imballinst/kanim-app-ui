import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';

import {
  primaryMineshaft,
  hexToRGB,
} from '../../utils/colors';

const RoundedListItem = ({
  outerStyle, onPress, innerStyle, children, onLongPress, delayLongPress,
}) => (
  <View style={outerStyle}>
    <TouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      underlayColor={hexToRGB(primaryMineshaft, 0.2)}
      style={innerStyle}
    >
      {children}
    </TouchableHighlight>
  </View>
);

RoundedListItem.propTypes = {
  outerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  innerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  delayLongPress: PropTypes.number,
  children: PropTypes.node.isRequired,
};

RoundedListItem.defaultProps = {
  onLongPress: () => {},
  delayLongPress: 3000,
};

export default RoundedListItem;
