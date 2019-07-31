import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { appReducer } from '../reducers/app.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  app: appReducer
});

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  composeWithDevTools(middleWareEnhancer)
);

export default store;

export type ApplicationState = ReturnType<typeof rootReducer>;
