import {
  ARTICLE_DISLIKE_REQUEST,
  ARTICLE_DISLIKE_SUCCESS,
} from '../../actionTypes';
import fetchData from '../../helpers';

const addArticleDislike = (slug) => async (dispatch) => {
  dispatch({ type: ARTICLE_DISLIKE_REQUEST });

  try {
    const response = await fetchData(
      'post',
      `/articles/${slug}/dislike`
    );

    if (response.status === 201) {
      dispatch({
        type: ARTICLE_DISLIKE_SUCCESS,
        data: response.data.article,
      });
    }
  } catch (error) {
    return null;
  }
};

export default addArticleDislike;
