import React, { Component } from 'react';
import SplashScreen from './Splash';
import requireAuth from '../utils/require-auth.hoc';
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  isAuthenticated: boolean;
  user?: {};
}

class AuthenticationScreen extends Component<Props> {
  componentDidMount(): void {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (<SplashScreen/>);
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { auth } = state;
  return auth;
};

export default connect(mapStateToProps)(requireAuth(AuthenticationScreen));

