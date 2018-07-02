import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Button from './Button';
import { tertiaryAlto } from '../../utils/colors';
import ModalContent from './ModalContent';

const style = StyleSheet.create({
  buttonRow: {
    height: 50,
  },
  modalButtonView: {
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  modalButton: {
    backgroundColor: tertiaryAlto,
    flex: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
});

const TextlessPrompt = ({ buttonObjects, keyName }) => (
  <ModalContent>
    {
      buttonObjects.reduce((nodes, cur, idx) => {
        const { text, onPress } = cur;
        const node = (
          <View style={style.buttonRow} key={`tlp-${keyName}-${idx + 1}`}>
            <Button
              containerViewStyle={style.modalButtonView}
              textStyle={style.modalText}
              title={text}
              onPress={onPress}
              {...style.modalButton}
            />
          </View>
        );

        return nodes.concat(node);
      }, [])
    }
  </ModalContent>
);

TextlessPrompt.propTypes = {
  buttonObjects: PropTypes.array,
  keyName: PropTypes.string.isRequired,
};

TextlessPrompt.defaultProps = {
  buttonObjects: [],
};

export default TextlessPrompt;
