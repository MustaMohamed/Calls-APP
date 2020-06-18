import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { agentReducer, appReducer, authReducer } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';


// application reducers
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  agent: agentReducer
});

// middle wares
const middlewares = [thunkMiddleware];
const middleWareConfig = applyMiddleware(...middlewares);

// persist config for save state in mobile storage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(middleWareConfig)
);
export const persistor = persistStore(store);


export type ApplicationState = ReturnType<typeof persistedReducer>;
