import React, { Component } from 'react';
import { AppContainer } from './navigations';
import { Root, StyleProvider } from 'native-base';
import theme from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { ApplicationState } from './redux-store/store';
import { StyleSheet, AppState } from 'react-native';
import { colorConstants } from './constants';
import { hideUiLoaderAction, changeAppIsInBackgroundState } from './redux-store/actions';

interface Props {
  uiLoaderIsActive: boolean;
  hideUiLoader: typeof hideUiLoaderAction;
  changeAppIsInBackgroundState: typeof changeAppIsInBackgroundState;
}

interface State {
  spinnerActive: boolean;
}

class Startup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      spinnerActive: false,
      appState: AppState.currentState,
    };
    this.tm = [];
  }

  componentDidMount(): void {
    // this.setState({ spinnerActive: this.props.uiLoaderIsActive });
    console.log('Application Did Mount !');
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount(): void {
    this.tm.map(tmNumber => clearTimeout(tmNumber));
    this.props.hideUiLoader();
    console.log('Application will UnMount !');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.props.uiLoaderIsActive !== this.state.spinnerActive) {
      this.tm.push(setTimeout(() => this.setState(state => ({ spinnerActive: !state.spinnerActive }))), 20);
    }
  }

  _handleAppStateChange = (nextAppState) => {
    const appIsInBackgroundState = !(this.state.appState.match(/inactive|background/) && nextAppState === 'active');
    this.setState({ appState: nextAppState });
    this.props.changeAppIsInBackgroundState(appIsInBackgroundState);
  };


  render() {
    return (
      <Root>
        <Spinner
          visible={this.state.spinnerActive}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
        <StyleProvider style={getTheme(theme)}>
          <AppContainer/>
        </StyleProvider>
      </Root>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  console.log(state);
  const { app } = state;
  return app;
};

export default connect(mapStateToProps, {
  hideUiLoader: hideUiLoaderAction,
  changeAppIsInBackgroundState: changeAppIsInBackgroundState
})(Startup);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colorConstants.BACKGROUND_PRIMARY
  }
});
