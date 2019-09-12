import React from 'react';
import { Link } from 'react-router-dom';

// Interfaces
// className (str), onClick (fn), isArticleLiked (bool), outlineIcon (img), filledIcon (img), tooltipDisplay (bool)

const LikeDislike = ({
  className,
  onClick,
  isArticleLiked,
  outlineIcon,
  filledIcon,
  tooltipDisplay,
}) => {
  return (
    <div className="Like">
      <span onClick={onClick} className={className}>
        <img src={isArticleLiked ? filledIcon : outlineIcon} alt="" />
        {tooltipDisplay && (
          <span>
            Please{' '}
            <Link
              to={{
                pathname: '/signup',
                state: { referrer: this.props.location.pathname },
              }}
            >
              signup
            </Link>{' '}
            or
            <Link
              to={{
                pathname: '/login',
                state: { referrer: this.props.location.pathname },
              }}
            >
              login
            </Link>{' '}
            to like or dislike this article
          </span>
        )}
      </span>
      <span>{likesCount}</span>
    </div>
  );
};

export default LikeDislike;
