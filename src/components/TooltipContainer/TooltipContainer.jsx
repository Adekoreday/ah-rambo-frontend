import React from 'react';
import PropTypes from 'prop-types';
import './TooltipContainer.scss';

const TooltipContainer = ({ className, children, onClick }) => {
  return (
    <span className={className} onClick={onClick}>
      {children}
    </span>
  );
};

TooltipContainer.defaultProps = {
  className: 'TooltipContainer',
  onClick: () => {},
};

TooltipContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default TooltipContainer;
