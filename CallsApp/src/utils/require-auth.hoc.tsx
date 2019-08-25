import React, { Component, ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { ApplicationState } from '../redux-store/store';
import { logoutAction } from '../redux-store/actions';
import { AgentStatus, AuthState, TimeConversion } from '../types';

interface RequireAuthProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  auth: AuthState;
  logout: typeof logoutAction;
  agentStatus: AgentStatus;
}

const requireAuth: Function = (AuthComponent: ComponentType) => {

  class Auth extends Component<equireAuthProps> {

    shouldComponentUpdate(nextProps: Readonly<equireAuthProps>, nextState: Readonly<{}>, nextContext: any): boolean {
      return (nextProps.auth.isAuthenticated != this.props.auth.isAuthenticated) || (nextProps.agentStatus != this.props.agentStatus);
    }

    UNSAFE_componentWillMount() {
      if (!this.props.auth.isAuthenticated) {
        this._handleAuthFailure(this.props);
      }
      this._checkAgentLastCheckin(this.props);
      this._checkAgentLastAction(this.props);
    }

    UNSAFE_componentWillUpdate(nextProps: RequireAuthProps) {
      if (!nextProps.auth.isAuthenticated) {
        this._handleAuthFailure(nextProps);
      }
      this._checkAgentLastCheckin(nextProps);
      this._checkAgentLastAction(nextProps);
    }

    private _handleAuthFailure(props: RequireAuthProps) {
      props.logout && props.logout(props.auth.user, false);
      props.navigation && props.navigation.navigate('Login');
    }

    // for daily checkin and logout every new day
    private _checkAgentLastCheckin(props: RequireAuthProps) {
      if (props.agentStatus) {
        const { checkInTime } = props.agentStatus;
        const checkInDate = new Date(checkInTime);
        const lastCheckInDay = checkInDate.getDate();
        const lastCheckInMonth = checkInDate.getMonth();
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth();

        if (currentDay > lastCheckInDay || currentMonth !== lastCheckInMonth) {
          props.logout(props.auth.user, true);
        }
      }
    }

    // for every 2 hours check for an activity
    private _checkAgentLastAction(props: RequireAuthProps) {
      if (props.agentStatus) {
        const { lastAction } = props.agentStatus;
        const lastActionTime = new Date(lastAction);
        const lastActionInHours = lastActionTime.getHours();
        const lastActionInMinutes = lastActionTime.getMinutes();
        const currentDayInHours = new Date().getHours();
        const currentDayInMinutes = new Date().getMinutes();
        const lastActionDiffTimeInMinutes = ((currentDayInHours - lastActionInHours) * TimeConversion.HoursToMinutes) + (currentDayInMinutes - lastActionInMinutes);
        if (lastActionDiffTimeInMinutes > TimeConversion.HoursToMinutes * 2) {
          props.logout(props.auth.user, false);
        }
      }
    }

    render() {
      return <AuthComponent {...(this.props)} />;
    }
  }

  const mapStateToProps = (state: ApplicationState) => {
    const { auth, agent } = state;
    const { agentStatus } = agent;
    return { auth, agentStatus };
  };

  return connect(mapStateToProps, { logout: logoutAction })(Auth);
};

export default requireAuth;
