import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';

import {
  primaryMineshaft,
  hexToRGB,
} from '../../utils/colors';

const RoundedListItem = ({
  outerStyle, onPress, innerStyle, children,
}) => (
  <View style={outerStyle}>
    <TouchableHighlight
      onPress={onPress}
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
  children: PropTypes.node.isRequired,
};


export default RoundedListItem;
