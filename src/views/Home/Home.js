import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  content: {
    background: '#fff',
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'column'
  },
  rowMargin: {
    marginBottom: theme.spacing.unit * 3
  }
});

class Home extends React.Component {
  render() {
    const { message, isError, classes } = this.props;
    const textMessageStyle = isError ? classes.textErrorMessage : classes.textProcessMessage;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classnames(classes.row, classes.rowMargin)}>
            <div className={classes.row}>Bookings used this year</div>
            <div className={classes.row}>4 out of 5 (use linear progress bar)</div>
          </div>
          <div className={classnames(classes.row, classes.rowMargin)}>
            <div className={classes.row}>Current bookings</div>
            <div className={classes.row}>List of bookings</div>
          </div>
          <div className={classnames(classes.row, classes.rowMargin)}>
            <div className={classes.row}>Current reminders</div>
            <div className={classes.row}>List of reminders</div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};

export default withStyles(styles)(Home);
