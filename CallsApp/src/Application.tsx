import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './redux-store/store';
import Startup from './Startup';
import { PersistGate } from "redux-persist/integration/react";
import { SplashScreen } from './screens';

class Application extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen/>} persistor={persistor}>
          <Startup/>
        </PersistGate>
      </Provider>
    );
  }
}

export default Application;
