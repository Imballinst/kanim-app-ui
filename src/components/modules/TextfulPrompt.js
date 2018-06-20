import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Button from './Button';
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

const TextfulPrompt = ({
  children, confirmText, cancelText, onConfirm, onCancel,
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
          onPress={onConfirm}
        />
        <Button
          containerViewStyle={style.modalButtonView}
          buttonStyle={style.modalRightButton}
          textStyle={style.modalText}
          title={cancelText}
          onPress={onCancel}
        />
      </View>
    </View>
  </ModalContent>
);

TextfulPrompt.propTypes = {
  children: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

TextfulPrompt.defaultProps = {
  children: null,
  confirmText: '',
  cancelText: '',
  onConfirm: () => {},
};

export default TextfulPrompt;
