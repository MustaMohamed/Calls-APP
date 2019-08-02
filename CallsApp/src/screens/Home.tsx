import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { hideUiLoader, showUiLoader } from '../redux-store/actions';
import { ApplicationState } from '../redux-store/store';

interface HomeScreenProps {
  uiLoaderIsActive?: boolean;
  showUiLoader?: typeof showUiLoader;
  hideUiLoader?: typeof hideUiLoader;
}

class HomeScreen extends Component<HomeScreenProps> {
  componentDidMount(): void {
    this.props.showUiLoader && this.props.showUiLoader();
  }

  render() {
    console.log(this.props);
    return (
      <Text>Hello From Home!</Text>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return app;
};

export default connect(mapStateToProps, { showUiLoader, hideUiLoader })(HomeScreen);
