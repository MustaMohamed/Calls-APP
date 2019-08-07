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

interface Props {
  uiLoaderIsActive: boolean;
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
    console.log(this.state);
    this.setState({ spinnerActive: this.props.uiLoaderIsActive });
  }

  componentWillUnmount(): void {
    this.tm.map(tmNumber => clearTimeout(tmNumber));
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    console.log('staaat => ', this.state, 'props => ', this.props);
    if (this.props.uiLoaderIsActive !== this.state.spinnerActive) {
      console.log('asfafa');
      this.tm.push(setTimeout(() => this.setState(state => ({ spinnerActive: !state.spinnerActive })), 100));
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

export default connect(mapStateToProps)(Startup);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colorConstants.BACKGROUND_PRIMARY
  }
});
