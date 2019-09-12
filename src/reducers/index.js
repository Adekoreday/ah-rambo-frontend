import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signupReducer';
import resetPassword from './user/resetPassword';
import requestPassword from './user/requestPassword';
import readArticle from './article/readArticle';
import articleLikeAndDislike from './article/articleLikeAndDislike';

export default combineReducers({
  loginReducer,
  signup,
  resetPassword,
  requestPassword,
  readArticle,
  articleLikeAndDislike,
});
