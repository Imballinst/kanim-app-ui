import React from 'react';
import PropTypes from 'prop-types';
import { KANIM_USERNAME, KANIM_PASSWORD } from 'react-native-dotenv';
import { ScrollView, View, Button, Text, StyleSheet, Image } from 'react-native';

import loginPic from './assets/loginpic.png';
import TextInput from './modules/TextInput';

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#353535',
    flex: 1,
    paddingHorizontal: '16.5%',
    height: '100%',
  },
  loginTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: '#d9d9d9',
    marginBottom: 20,
  },
  loginImage: {
    opacity: 1,
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
  },
  formContainer: {
    flex: 2,
  },
  textInput: {
    padding: 5,
    marginBottom: 15,
    alignItems: 'stretch',
    color: '#fff',
  },
  textProcessMessage: {
    color: '#0000ff',
  },
  textErrorMessage: {
    color: '#ff0000',
  },
});

class Login extends React.Component {
  state = { username: KANIM_USERNAME, password: KANIM_PASSWORD }

  componentDidMount() {
    this.props.refreshLoginView();
  }

  onChange = type => (text) => {
    this.setState({ [type]: text });
  }

  onPress = () => {
    const { login } = this.props;
    const { username, password } = this.state;

    login(username, password);
  }

  render() {
    const { message, isError } = this.props;
    const textMessageStyle = isError ? style.textErrorMessage : style.textProcessMessage;

    return (
      <ScrollView style={style.viewStyle}>
        <View style={style.loginImageContainer}>
          <Image source={loginPic} style={style.loginImage} />
        </View>
        <View style={style.formContainer}>
          <Text style={style.loginTitle}>
            Untuk masuk, silahkan login dengan akun Kantor Imigrasi Online Anda.
          </Text>
          <TextInput
            placeholder="Username"
            style={style.textInput}
            value={this.state.username}
            onChangeText={(this.onChange('username'))}
          />
          <TextInput
            placeholder="Password"
            style={style.textInput}
            value={this.state.password}
            onChangeText={this.onChange('password')}
            secureTextEntry
          />
          <Text style={textMessageStyle}>{message}</Text>
          <Button
            color="#3c6e71"
            onPress={this.onPress}
            title="Login"
          />
        </View>
      </ScrollView>
    );
  }
}

Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  refreshLoginView: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
