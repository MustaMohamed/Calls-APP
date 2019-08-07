import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-store/store';
import Startup from './Startup';

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Startup/>
      </Provider>
    );
  }
}

export default Application;
