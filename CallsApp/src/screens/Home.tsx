import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { hideUiLoader, showUiLoader, logout } from '../redux-store/actions';
import { ApplicationState } from '../redux-store/store';
import { Button, Container, Header, Title, Body, Text } from 'native-base';
import { colorConstants } from '../constants';
import requireAuth from '../utils/require-auth.hoc';
import TimerProgressCircle from '../components/generic/TimerProgressCircle';

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
        <View style={styles.contentContainer}>
          <View style={styles.timer}>
            <TimerProgressCircle timerSeconds={20}/>
          </View>
          <View style={styles.buttonsContainer}>
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
          </View>
        </View>
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
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10
  },

  timer: {
    alignSelf: 'center'
  }
});
