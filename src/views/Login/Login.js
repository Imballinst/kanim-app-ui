import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import loginPic from '../assets/loginpic.png';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing.unit * 2
  },
  content: {
    borderRadius: 10,
    background: '#fff',
    padding: theme.spacing.unit * 2,
    boxShadow: theme.custom.shadow.big
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 3
  },
  image: {
    width: 250
  },
  instructions: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 3
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacing.unit * 12}px`
    },
    [theme.breakpoints.between('xs', 'md')]: {
      padding: `0 ${theme.spacing.unit * 6}px`
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.spacing.unit * 3}px`
    }
  },
  textInput: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.primary.contrastText
  },
  forgotPassword: {
    fontSize: 11
  },
  textProcessMessage: {
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    fontFamily: 'Merriweather',
    fontWeight: 700,
    boxShadow: theme.custom.shadow.small
  },
  signupButton: {
    background: '#fff',
    color: '#000'
  },
  orText: {
    textAlign: 'center',
    fontSize: 12,
    margin: `${theme.spacing.unit / 2}px 0`
  }
});

class Login extends Component {
  state = {
    username: process.env.REACT_APP_KANIM_USERNAME || '',
    password: process.env.REACT_APP_KANIM_PASSWORD || ''
  };

  onChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('wew', this.state);
    const { username, password } = this.state;

    this.props.login(username, password);
  };

  render() {
    const { message, isError, classes } = this.props;
    const textMessageStyle = isError ? classes.textErrorMessage : classes.textProcessMessage;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <img alt="Kanim App Logo" src={loginPic} className={classes.image} />
          </div>
          <div className={classes.instructions}>
            Masukkan informasi akun Kantor Imigrasi Online Anda.
          </div>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              type="text"
              label="Username"
              className={classes.textInput}
              value={this.state.username}
              onChange={this.onChange('username')}
            />
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              className={classes.textInput}
              value={this.state.password}
              onChange={this.onChange('password')}
            />
            <div className={classes.forgotPassword}>Lupa password?</div>
            <span className={textMessageStyle}>{message}</span>

            <Button type="submit" className={classes.button} color="primary" variant="contained">
              Masuk
            </Button>
            <div className={classes.orText}>atau</div>
            <Button className={classes.button} color="secondary" variant="contained">
              Daftar
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
