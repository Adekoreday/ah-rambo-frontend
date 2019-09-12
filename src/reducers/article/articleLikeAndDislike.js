import {
  ARTICLE_LIKE_REQUEST,
  ARTICLE_LIKE_SUCCESS,
  ARTICLE_DISLIKE_REQUEST,
  ARTICLE_DISLIKE_SUCCESS,
} from '../../actionTypes';

const initialState = { article: {}, loading: false };

const articleLikeAndDislike = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_LIKE_REQUEST:
      return {
        article: {},
        loading: true,
      };
    case ARTICLE_DISLIKE_REQUEST:
      return {
        article: {},
        loading: true,
      };
    case ARTICLE_LIKE_SUCCESS:
      return {
        article: action.data,
        loading: false,
      };
    case ARTICLE_DISLIKE_SUCCESS:
      return {
        article: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default articleLikeAndDislike;
