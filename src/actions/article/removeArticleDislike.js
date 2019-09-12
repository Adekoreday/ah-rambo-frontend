import {
  ARTICLE_DISLIKE_REQUEST,
  ARTICLE_DISLIKE_SUCCESS,
} from '../../actionTypes';
import fetchData from '../../helpers';

const removeArticleDislike = (slug) => async (dispatch) => {
  dispatch({ type: ARTICLE_DISLIKE_REQUEST });

  try {
    const response = await fetchData(
      'delete',
      `/articles/${slug}/dislike`
    );

    dispatch({
      type: ARTICLE_DISLIKE_SUCCESS,
      data: response.data.article,
    });
  } catch (error) {
    return null;
  }
};

export default removeArticleDislike;
