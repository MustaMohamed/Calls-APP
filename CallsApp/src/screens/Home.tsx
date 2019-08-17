import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { hideUiLoader, showUiLoader, logout } from '../redux-store/actions';
import { ApplicationState } from '../redux-store/store';
import { Button, Container, Content, Header, Title, Body } from 'native-base';
import { colorConstants } from '../constants';
import requireAuth from '../utils/require-auth.hoc';

interface Props {
  showUiLoader?: typeof showUiLoader;
  hideUiLoader?: typeof hideUiLoader;
  logout?: typeof logout;
  uiLoaderIsActive?: boolean;
}

interface State {
  isBreakActive: boolean;
  isShiftActive: boolean;
}

class HomeScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isBreakActive: true,
      isShiftActive: false,
    };
  }

  toggleShiftBreak = () => {
    this.props.logout();
    this.setState((prevState: State) => ({ isShiftActive: !prevState.isShiftActive, isBreakActive: !prevState.isBreakActive }))
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
        </Header>
        <Content padder>
          <Button block style={styles.shiftBtn}
                  disabled={this.state.isShiftActive && !this.state.isBreakActive}
                  onPress={this.toggleShiftBreak}>
            <Text style={styles.textBtn}>Start Shift</Text>
          </Button>
          <Button block style={styles.shiftBtn}
                  disabled={!this.state.isShiftActive && this.state.isBreakActive}
                  onPress={this.toggleShiftBreak}>
            <Text style={styles.textBtn}>Start Break</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return app;
};

export default connect(mapStateToProps, { showUiLoader, hideUiLoader, logout })(requireAuth(HomeScreen));

const styles = StyleSheet.create({
  header: {
    // backgroundColor: colorConstants.BACKGROUND_PRIMARY,
  },
  shiftBtn: {
    marginVertical: 10,
    // backgroundColor: colorConstants.BACKGROUND_PRIMARY
  },
  textBtn: {
    color: colorConstants.WHITE,
    fontWeight: 'bold'
  },
  spinnerTextStyle: {
    color: colorConstants.BACKGROUND_PRIMARY
  }
});
