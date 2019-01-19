import React, { Component } from 'react';
import PropTypes from 'prop-types';

import addWeeks from 'date-fns/addWeeks';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import RoundedListItem from '../components/RoundedListItem';
import { formatQueryParamsDate } from '../helpers/Time';
import filterByProp from '../helpers/Object';

const styles = theme => ({});

class Offices extends Component {
  state = {
    filter: ''
  };

  componentDidMount() {
    if (!this.props.kanim.offices.length) {
      this.props.getOffices(this.props.auth.token);
    }
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  onClickDetailKanim = id => () => {
    const { token } = this.props.auth;
    const date = new Date();

    const formattedStartDate = formatQueryParamsDate(date);
    const formattedEndDate = formatQueryParamsDate(addWeeks(date, 2));

    this.props.history.push(`/offices/${id}`);
    this.props.getOffice(token, id, formattedStartDate, formattedEndDate);
  };

  render() {
    const { kanim, classes } = this.props;
    const { filter } = this.state;

    const filteredOffices = filter ? filterByProp(kanim.offices, 'MO_NAME', filter) : kanim.offices;
    const listOffices = !kanim.getOfficesAttempt ? (
      filteredOffices.reduce((nodes, cur, idx) => {
        const { MO_NAME, MO_ID, MO_ADDRESS, MO_TELP } = cur;
        const office = (
          <RoundedListItem
            key={`list-kanim-${idx + 1}`}
            classes={classes}
            onClick={this.onClickDetailKanim(MO_ID)}
          >
            <div>
              <span className={classes.kanimOfficeNameStyle}>{MO_NAME}</span>
              <span className={classes.text}>{MO_ADDRESS}</span>
              <span className={classes.text}>{MO_TELP}</span>
            </div>
          </RoundedListItem>
        );

        return nodes.concat(office);
      }, [])
    ) : (
      <div style={{ marginTop: 10 }}>Activity Indicator</div>
    );

    return (
      <div style={classes.root}>
        <div keyboardShouldPersistTaps="handled">
          {filteredOffices && filteredOffices.length > 0 && (
            <input placeholder="Filter Nama Kanim" onChange={this.onFilterChange} value={filter} />
          )}
          {listOffices}
        </div>
      </div>
    );
  }
}

Offices.propTypes = {
  navigation: PropTypes.object.isRequired,
  getOffice: PropTypes.func.isRequired,
  getOffices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  kanim: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(Offices);
