import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE,
} from '../../actionTypes';

const initialState = {
  loading: false,
  article: {},
  error: null,
};

const readArticle = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        article: action.data,
        error: null,
      };
    case GET_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        article: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export default readArticle;
