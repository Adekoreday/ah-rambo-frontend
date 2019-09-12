import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';

const Tooltip = ({ className, children, onClick }) => (
  <span className={className}>
    {children}
    <span className="close-btn" title="close" onClick={onClick}>
      X
    </span>
  </span>
);

Tooltip.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tooltip;
