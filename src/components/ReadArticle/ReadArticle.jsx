/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-shadow */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getArticle from '../../actions/article/readArticle';
import addArticleLike from '../../actions/article/addArticleLike';
import removeArticleLike from '../../actions/article/removeArticleLike';
import addArticleDislike from '../../actions/article/addArticleDislike';
import removeArticleDislike from '../../actions/article/removeArticleDislike';
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  ThumbsUpFilledIcon,
  ThumbsDownFilledIcon,
} from '../../../assets/icons';
import './ReadArticle.scss';
import TooltipContainer from '../TooltipContainer/TooltipContainer';
import Tooltip from '../Tooltip/Tooltip';

/**
 * @class
 */
class ReadArticle extends Component {
  state = {
    isArticleLiked: false,
    isArticleDisliked: false,
    likesCount: null,
    dislikesCount: null,
    isUserAuthenticated: false,
    isLikeTooltipVisible: false,
    isDislikeTooltipVisible: false,
  };

  /**
   * @name componentDidMount
   * @returns {Null} null
   */
  async componentDidMount() {
    const {
      getArticle: getUserArticle,
      match: { params },
    } = this.props;

    this.getCurrentUser();
    await getUserArticle(params.slug);
    this.renderLikeDislikeOnMount();

    const {
      article: { likesCount, dislikesCount },
    } = this.props;
    this.setState({ likesCount, dislikesCount });
  }

  componentDidUpdate(prevProps, prevState) {
    const { articleLikeAndDislike } = this.props;
    const { isArticleLiked, isArticleDisliked } = this.state;

    const userLikedArticle = prevState.isArticleLiked !== isArticleLiked;
    const userDislikedArticle =
      prevState.isArticleDisliked !== isArticleDisliked;

    if (userLikedArticle || userDislikedArticle) {
      this.setState({
        likesCount: articleLikeAndDislike.article.likesCount,
        dislikesCount: articleLikeAndDislike.article.dislikesCount,
      });
    }
  }

  getCurrentUser = () => {
    const username = localStorage.getItem('username');
    const isUserAuthenticated = username ? true : false;
    this.setState({ isUserAuthenticated });
    return { username };
  };

  renderLikeDislikeOnMount = () => {
    const {
      article: { likes, dislikes },
    } = this.props;

    likes.forEach(({ User }) => {
      if (User.userName === this.getCurrentUser().username) {
        this.setState({ isArticleLiked: true });
      }
    });

    dislikes.forEach(({ User }) => {
      if (User.userName === this.getCurrentUser().username) {
        this.setState({ isArticleDisliked: true });
      }
    });
  };

  setLikeDislikeIconClass = () => {
    const { articleLikeAndDislike } = this.props;
    return articleLikeAndDislike.loading
      ? 'TooltipContainer icon disbaled'
      : 'TooltipContainer icon';
  };

  handleArticleLike = async () => {
    const { isUserAuthenticated } = this.state;
    if (!isUserAuthenticated) {
      this.setState({
        isLikeTooltipVisible: true,
        isDislikeTooltipVisible: false,
      });
      return null;
    }

    const {
      article: { slug },
      addArticleLike,
      removeArticleLike,
    } = this.props;
    const { isArticleLiked } = this.state;

    if (isArticleLiked) {
      await removeArticleLike(slug);

      const { articleLikeAndDislike: { article } } = this.props;
      if (Object.keys(article).length === 0) return null;

      this.setState({ isArticleLiked: !isArticleLiked });
    } else {
      await addArticleLike(slug);

      const { articleLikeAndDislike: { article } } = this.props;
      if (Object.keys(article).length === 0) return null;

      this.setState({
        isArticleLiked: !isArticleLiked,
        isArticleDisliked: false,
      });
    }
  };

  handleArticleDislike = async () => {
    const { isUserAuthenticated } = this.state;
    if (!isUserAuthenticated) {
      this.setState({
        isDislikeTooltipVisible: true,
        isLikeTooltipVisible: false,
      });
      return null;
    }

    const {
      article: { slug },
      addArticleDislike,
      removeArticleDislike,
      articleLikeAndDislike: { article }
    } = this.props;
    const { isArticleDisliked } = this.state;

    if (isArticleDisliked) {
      await removeArticleDislike(slug);

      const { articleLikeAndDislike: { article } } = this.props;
      if (Object.keys(article).length === 0) return null;

      this.setState({ isArticleDisliked: !isArticleDisliked });
    } else {
      await addArticleDislike(slug);

      const { articleLikeAndDislike: { article } } = this.props;
      if (Object.keys(article).length === 0) return null;

      this.setState({
        isArticleDisliked: !isArticleDisliked,
        isArticleLiked: false,
      });
    }
  };

  closeTooltip = (event) => {
    event.stopPropagation();
    this.setState({
      isLikeTooltipVisible: false,
      isDislikeTooltipVisible: false,
    });
  };

  setTooltipContent = (action, referrer) => {
    const signupPath = {
      pathname: '/signup',
      state: { referrer },
    };
    const loginPath = {
      pathname: '/login',
      state: { referrer },
    };

    return (
      <>
        Please {<Link to={signupPath}>signup</Link>} or{' '}
        {<Link to={loginPath}>login</Link>} to {action} this article
      </>
    );
  };

  /**
   * @name render
   * @returns {HTML} HTML DOM elements
   */
  render() {
    const {
      isArticleLiked,
      isArticleDisliked,
      likesCount,
      dislikesCount,
      isLikeTooltipVisible,
      isDislikeTooltipVisible,
    } = this.state;
    const {
      location: { pathname },
    } = this.props;

    return (
      <>
        <div className="Like">
          <TooltipContainer
            onClick={this.handleArticleLike}
            className={this.setLikeDislikeIconClass()}
          >
            <img
              src={isArticleLiked ? ThumbsUpFilledIcon : ThumbsUpIcon}
              alt=""
            />
            {isLikeTooltipVisible && (
              <Tooltip className="Tooltip__content" onClick={this.closeTooltip}>
                {this.setTooltipContent('like', pathname)}
              </Tooltip>
            )}
          </TooltipContainer>
          <span className="Like__count">{likesCount}</span>
        </div>

        <div className="Dislike">
          <TooltipContainer
            onClick={this.handleArticleDislike}
            className={this.setLikeDislikeIconClass()}
          >
            <img
              src={isArticleDisliked ? ThumbsDownFilledIcon : ThumbsDownIcon}
              alt=""
            />
            {isDislikeTooltipVisible && (
              <Tooltip className="Tooltip__content" onClick={this.closeTooltip}>
                {this.setTooltipContent('dislike', pathname)}
              </Tooltip>
            )}
          </TooltipContainer>
          <span className="Dislike__count">{dislikesCount}</span>
        </div>
      </>
    );
  }
}

ReadArticle.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
  articleLikeAndDislike: PropTypes.object.isRequired,
  addArticleLike: PropTypes.func.isRequired,
  removeArticleLike: PropTypes.func.isRequired,
  addArticleDislike: PropTypes.func.isRequired,
  removeArticleDislike: PropTypes.func.isRequired,
};

export const mapStateToProps = ({
  readArticle: { loading, article, error },
  articleLikeAndDislike,
}) => ({
  loading,
  article,
  error,
  articleLikeAndDislike,
});

const mapDispatchToProps = {
  getArticle,
  addArticleLike,
  addArticleDislike,
  removeArticleLike,
  removeArticleDislike,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadArticle);
