import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { articleWithoutLike } from '../../helpers/__mocks__/articleResponses';
import removeArticleLike from './removeArticleLike';
import { ARTICLE_LIKE_SUCCESS } from '../../actionTypes';

describe('Action Creator for Removing Like on an Article', () => {
  const mockStore = configureStore([ReduxThunk]);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns success when request is successful', async () => {
    const store = mockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: { message: 'like removed successfully' } },
      });
    });

    await store.dispatch(removeArticleLike(articleWithoutLike.article.slug));
    expect(store.getActions()[1].type).toEqual(ARTICLE_LIKE_SUCCESS);
  });

  it('does not change the state of the application when requests fails', async () => {
    const initialState = { article: {}, loading: false }
    const store = mockStore(initialState);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: { error: 'article not found' },
        },
      });
    });

    await store.dispatch(removeArticleLike(articleWithoutLike.article.slug));
    expect(store.getState()).toMatchObject(initialState);
  });
});
