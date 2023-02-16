import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';

import {
  userLoginReducer,
  userRegisterReducer,
} from '../reducers/userReducers';

import { categoriesSlice } from './categories/categoriesSlice';

import { videosSlice } from './videos/videosSlice';

const reducer = combineReducers({
  categories: categoriesSlice.reducer,

  videos: videosSlice.reducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
