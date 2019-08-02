import React, { Component, ComponentClass, ComponentType, FC } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';

interface RequireAuthProps {
  isAuthenticated?: boolean;
  redirect?: Function;
  user?: {}
}

const requireAuth: Function = (AuthComponent: ComponentType) => {

  class Auth extends Component<RequireAuthProps> {
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { isAuthenticated, redirect } = this.props;

      if (!isAuthenticated) {
        redirect && redirect();
      }
    }

    render() {
      return this.props.isAuthenticated ? <AuthComponent {...(this.props)} /> : null;
    }
  }

  const mapStateToProps = (state: ApplicationState) => {
    const { auth } = state;
    const { isAuthenticated, user } = auth;
    return {
      isAuthenticated,
      user
    };
  };

  return connect(mapStateToProps)(Auth);
};
