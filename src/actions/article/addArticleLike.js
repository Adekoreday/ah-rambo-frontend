import {
  ARTICLE_LIKE_REQUEST,
  ARTICLE_LIKE_SUCCESS,
} from '../../actionTypes';
import fetchData from '../../helpers';

const addArticleLike = (slug) => async (dispatch) => {
  dispatch({ type: ARTICLE_LIKE_REQUEST });

  try {
    const response = await fetchData('post', `/articles/${slug}/like`);

    if (response.status === 201) {
      dispatch({
        type: ARTICLE_LIKE_SUCCESS,
        data: response.data.article,
      });
    }
  } catch (error) {
    return null;
  }
};

export default addArticleLike;
