import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { ApplicationState } from '../redux-store/store';
import { logoutAction } from '../redux-store/actions';

interface RequireAuthProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  isAuthenticated?: boolean;
  user?: {};
  logout: typeof logoutAction;
}

const requireAuth: Function = (AuthComponent: ComponentType) => {

  class Auth extends Component<RequireAuthProps> {

    UNSAFE_componentWillMount() {
      if (!this.props.isAuthenticated) {
        this._handleAuthFailure(this.props);
      }
    }


    UNSAFE_componentWillUpdate(nextProps: RequireAuthProps) {
      if (!nextProps.isAuthenticated) {
        this._handleAuthFailure(nextProps);
      }
    }

    private _handleAuthFailure(props: RequireAuthProps) {
      props.logout && props.logout();
      props.navigation && props.navigation.navigate('Login');
    }

    render() {
      return <AuthComponent {...(this.props)} />;
    }
  }

  const mapStateToProps = (state: ApplicationState) => {
    const { auth } = state;
    return auth;
  };

  return connect(mapStateToProps, { logout: logoutAction })(Auth);
};

export default requireAuth;
