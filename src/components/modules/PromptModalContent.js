import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, StyleSheet } from 'react-native';

import {
  primaryMineshaft,
  tertiaryAlto,
} from '../../utils/colors';
import ModalContent from './ModalContent';

const style = StyleSheet.create({
  modalFooter: {
    height: 50,
  },
  modalButtonView: {
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  modalLeftButton: {
    backgroundColor: tertiaryAlto,
    flex: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: primaryMineshaft,
  },
  modalRightButton: {
    backgroundColor: tertiaryAlto,
    flex: 1,
    borderTopWidth: 1,
    borderColor: primaryMineshaft,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
});

const PromptModalContent = ({
  children, onModalClose, confirmText, cancelText,
}) => (
  <ModalContent>
    {children}
    <View style={style.modalFooter}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button
          containerViewStyle={style.modalButtonView}
          buttonStyle={style.modalLeftButton}
          textStyle={style.modalText}
          title={confirmText}
          onPress={() => {}}
        />
        <Button
          containerViewStyle={style.modalButtonView}
          buttonStyle={style.modalRightButton}
          textStyle={style.modalText}
          title={cancelText}
          onPress={onModalClose}
        />
      </View>
    </View>
  </ModalContent>
);

PromptModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  onModalClose: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
};

export default PromptModalContent;
