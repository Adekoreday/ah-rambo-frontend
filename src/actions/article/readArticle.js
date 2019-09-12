import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE,
} from '../../actionTypes';
import fetchData from '../../helpers';

const getArticle = (slug) => async (dispatch) => {
  dispatch({
    type: GET_ARTICLE_REQUEST,
  });
  try {
    const url = `/articles/read/${slug}`;
    const {
      data: { article },
    } = await fetchData('get', url);
    dispatch({
      type: GET_ARTICLE_SUCCESS,
      data: article,
    });
  } catch (error) {
    dispatch({
      type: GET_ARTICLE_FAILURE,
      error: error.response,
    });
  }
};

export default getArticle;
