import React from 'react';
import PropTypes from 'prop-types';

// TODO(aji): search how to make button onClick and onLongClick (something like that)
const RoundedListItem = ({ classes, onClick, children }) => (
  <div className={classes.container}>
    <button onClick={onClick} className={classes.button}>
      {children}
    </button>
  </div>
);

RoundedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

RoundedListItem.defaultProps = {
  onClick: () => {}
};

export default RoundedListItem;
