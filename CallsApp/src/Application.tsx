import React, { Component } from 'react';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import { store } from './redux-store/store';

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home/>
      </Provider>
    );
  }
}

export default Application;
