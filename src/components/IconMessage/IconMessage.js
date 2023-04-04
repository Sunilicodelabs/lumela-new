import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconMessage = props => {
  const { rootClassName, className, pencilClassName } = props;
  const classes = classNames(rootClassName , className);
  return (
    <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M4.28161 20.5934V27L10.8011 20.5956H24.3085C26.0738 20.5956 27.2132 19.4548 27.2132 17.6909V2.71919C27.2132 1.16876 25.9637 0 24.3085 0H2.90476C1.27542 0 0 1.19463 0 2.71919V17.6888C0 19.5066 1.08551 20.5934 2.90476 20.5934H4.28161ZM1.69849 2.85523C1.69849 2.0952 2.37942 1.69629 3.05398 1.69629V1.69839H24.1587C24.8333 1.69839 25.5142 2.0973 25.5142 2.85733V17.4344C25.5142 18.333 25.0716 18.7718 24.1587 18.7718H10.223L5.92029 22.9436V18.7697H3.05398C2.09215 18.7697 1.69849 18.3834 1.69849 17.4323V2.85523Z" fill="#2F2F2F"/>
</svg>

  );
};

IconMessage.defaultProps = {
  rootClassName: null,
  className: null,
  pencilClassName: null,
};

const { string } = PropTypes;

IconMessage.propTypes = {
  rootClassName: string,
  className: string,
  pencilClassName: string,
};

export default IconMessage;
