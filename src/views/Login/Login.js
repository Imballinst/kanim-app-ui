import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import loginPic from '../assets/loginpic.png';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary,
    display: 'flex'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: theme.palette.contrastText,
    marginBottom: 20
  },
  image: {
    opacity: 1,
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200
  },
  form: {
    display: 'flex'
  },
  textInput: {
    padding: 5,
    marginBottom: 15,
    alignItems: 'stretch',
    color: theme.palette.contrastText
  },
  textProcessMessage: {
    color: theme.palette.contrastText
  }
});

class Login extends React.Component {
  state = {
    username: process.env.REACT_APP_KANIM_USERNAME || '',
    password: process.env.REACT_APP_KANIM_PASSWORD || ''
  };

  onChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    this.props.login(username, password);
  };

  render() {
    const { message, isError } = this.props;
    const textMessageStyle = isError ? styles.textErrorMessage : styles.textProcessMessage;

    return (
      <div style={styles.root} keyboardShouldPersistTaps="handled">
        <div style={styles.imageContainer}>
          <img source={loginPic} style={styles.image} />
        </div>
        <div style={styles.form}>
          <span style={styles.title}>
            Untuk masuk, silahkan login dengan akun Kantor Imigrasi Online Anda.
          </span>
          <TextField
            placeholder="Username"
            style={styles.textInput}
            value={this.state.username}
            onChangeText={this.onChange('username')}
          />
          <TextField
            placeholder="Password"
            style={styles.textInput}
            value={this.state.password}
            onChangeText={this.onChange('password')}
            secureTextEntry
          />
          <span style={textMessageStyle}>{message}</span>
          <Button color="#3c6e71" onClick={this.onClick} title="Login" />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  refreshLoginView: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default Login;
