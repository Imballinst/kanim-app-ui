import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Animated,
} from 'react-native';

class CustomTextInput extends React.Component {
  state = {
    focused: false,
    topValue: new Animated.Value(24),
  }

  componentDidMount() {
    this.onAnimate();
  }

  onFocus = () => {
    this.setState({ focused: true }, () => this.onAnimate());
  }

  onBlur = () => {
    this.setState({ focused: false }, () => this.onAnimate());
  }

  onAnimate = () => {
    const { value } = this.props;

    const { focused, topValue } = this.state;
    const nextValue = focused || value !== '' ? 1 : 24;

    Animated.timing(
      topValue,
      {
        toValue: nextValue,
        duration: 100,
      }
    ).start();
  }

  render() {
    const { focused, topValue } = this.state;
    const {
      placeholder, value, activeColor, inactiveColor, ...props
    } = this.props;
    const isLabelFloating = focused || value !== '';

    return (
      <View>
        <Animated.Text
          style={{
            fontSize: 12,
            paddingHorizontal: 4,
            fontWeight: isLabelFloating ? 'bold' : 'normal',
            color: isLabelFloating ? activeColor : inactiveColor,
            top: topValue,
          }}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          underlineColorAndroid={focused ? activeColor : inactiveColor}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder=""
          value={value}
          {...props}
        />
      </View>
    );
  }
}

CustomTextInput.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
};

CustomTextInput.defaultProps = {
  placeholder: '',
  style: {},
  value: '',
  onChangeText: () => {},
  secureTextEntry: false,
  activeColor: '#fff',
  inactiveColor: '#888',
};

export default CustomTextInput;
