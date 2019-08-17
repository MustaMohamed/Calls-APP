import React, { Component } from 'react';
import { AppContainer } from './navigations';
import { Root, StyleProvider } from 'native-base';
import theme from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { ApplicationState } from './redux-store/store';
import { StyleSheet } from 'react-native';
import { colorConstants } from './constants';
import { hideUiLoader } from './redux-store/actions';

interface Props {
  uiLoaderIsActive: boolean;
  hideUiLoader: typeof hideUiLoader
}

interface State {
  spinnerActive: boolean;
}

class Startup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      spinnerActive: false
    };
    this.tm = [];
  }

  componentDidMount(): void {
    this.setState({ spinnerActive: this.props.uiLoaderIsActive });
  }

  componentWillUnmount(): void {
    this.tm.map(tmNumber => clearTimeout(tmNumber));
    this.props.hideUiLoader();
    // this.setState({ spinnerActive: false });
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.props.uiLoaderIsActive !== this.state.spinnerActive) {
      this.tm.push(setTimeout(() => this.setState(state => ({ spinnerActive: !state.spinnerActive })), 50));
    }
  }

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
  const { app } = state;
  return app;
};

export default connect(mapStateToProps, { hideUiLoader })(Startup);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colorConstants.BACKGROUND_PRIMARY
  }
});
