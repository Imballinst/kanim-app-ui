import React from 'react';
import PropTypes from 'prop-types';
import StepIndicatorRN from 'react-native-step-indicator';

import { primaryMineshaft, secondaryWilliam } from '../../utils/colors';

const stepStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: primaryMineshaft,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: primaryMineshaft,
  stepStrokeUnFinishedColor: secondaryWilliam,
  separatorFinishedColor: primaryMineshaft,
  separatorUnFinishedColor: secondaryWilliam,
  stepIndicatorFinishedColor: primaryMineshaft,
  stepIndicatorUnFinishedColor: '#fff',
  stepIndicatorCurrentColor: '#fff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: primaryMineshaft,
  stepIndicatorLabelFinishedColor: '#fff',
  stepIndicatorLabelUnFinishedColor: secondaryWilliam,
  labelColor: primaryMineshaft,
  labelSize: 13,
  currentStepLabelColor: primaryMineshaft,
};

const StepIndicator = ({ labels, currentPosition, styles }) => (
  <StepIndicatorRN
    customStyles={styles}
    currentPosition={currentPosition}
    labels={labels}
    stepCount={labels.length}
  />
);

StepIndicator.propTypes = {
  labels: PropTypes.array.isRequired,
  currentPosition: PropTypes.number.isRequired,
  styles: PropTypes.object,
};

StepIndicator.defaultProps = {
  styles: stepStyles,
};

export default StepIndicator;
