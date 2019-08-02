import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-store/store';
import {AppNavigator} from './navigations';

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default Application;
