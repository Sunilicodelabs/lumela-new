import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconRightArrow = props => {
  const { rootClassName, className, pencilClassName } = props;
  const classes = classNames(rootClassName , className);
  return (
    <svg
      className={classes}
      width="36"
      height="16"
      viewBox="0 0 36 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.3636 6.93505H16.147C15.2492 6.93505 2.15919 6.55259 0.977689 6.88731C0.26879 7.0308 -0.251054 7.84347 0.126982 8.70411C0.552207 9.756 3.57684 9.42128 5.41985 9.42128C10.3347 9.42128 15.2492 9.6125 20.2583 9.6125L31.6472 9.51675C30.7021 11.3335 26.449 14.2977 28.3864 15.684C29.5677 16.5924 30.2294 15.3016 30.6547 14.8234C32.3559 12.8631 33.7265 11.1421 35.2858 9.08629C37.176 6.55232 35.0968 6.7916 31.5998 3.6362C30.9381 3.01478 28.339 0.28961 28.0084 0.146074C27.0633 -0.332135 26.1182 0.433059 26.2126 1.43696C26.3072 2.68004 31.1274 6.45687 31.3636 6.93477V6.93505Z"
        fill="white"
      />
    </svg>
  );
};

IconRightArrow.defaultProps = {
  rootClassName: null,
  className: null,
  pencilClassName: null,
};

const { string } = PropTypes;

IconRightArrow.propTypes = {
  rootClassName: string,
  className: string,
  pencilClassName: string,
};

export default IconRightArrow;
