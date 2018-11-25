import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import {
  primaryMineshaft,
  tertiaryAlto,
} from '../../utils/colors';

const style = StyleSheet.create({
  modalContainer: {
    backgroundColor: tertiaryAlto,
    borderRadius: 4,
    borderColor: primaryMineshaft,
    borderWidth: 1,
    marginVertical: 20,
  },
});

const ModalContent = ({ children }) => (
  <View style={style.modalContainer}>
    {children}
  </View>
);

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContent;
