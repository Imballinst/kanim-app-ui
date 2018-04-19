import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#c1c3c8',
    flex: 1,
    paddingHorizontal: '16.5%',
    height: '100%',
  },
});

const Stub = () => (
  <View style={style.viewStyle}>
    <Text>This is Stub view, accessible only via Drawer</Text>
  </View>
);

Stub.propTypes = {};

export default Stub;
