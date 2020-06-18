import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  hideUiLoaderAction,
  showUiLoaderAction,
  getAgentStatusAction,
  startAgentBreakAction,
  endAgentBreakAction,
  startAgentShiftAttendanceAction, endAgentShiftAction, logoutAction
} from '../redux-store/actions';
import { ApplicationState } from '../redux-store/store';
import { Button, Container, Header, Title, Body, Text, Fab, Icon, Toast } from 'native-base';
import { colorConstants } from '../constants';
import requireAuth from '../utils/require-auth.hoc';
import TimerProgressCircle from '../components/generic/TimerProgressCircle';
import { AgentState, AgentStatus, AppState, AuthState, BreakInfo } from '../types';

interface Props {
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  uiLoaderIsActive?: boolean;
  getAgentStatus: typeof getAgentStatusAction;
  startAgentShiftAttendance: typeof startAgentShiftAttendanceAction;
  endAgentShift: typeof endAgentShiftAction;
  startAgentBreak: typeof startAgentBreakAction;
  endAgentBreak: typeof endAgentBreakAction;
  logout: typeof logoutAction;
  auth: AuthState;
  agentStatus: AgentStatus;
  breakInfo: BreakInfo;
}

interface State {
  isBreakActive: boolean;
  isShiftActive: boolean;
  isFabActionsActive: boolean;
}

class HomeScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isBreakActive: false,
      isShiftActive: true,
      isFabActionsActive: false,
    };
  }

  componentDidMount(): void {
    const { agentStatus } = this.props;
    this.setState({
      isBreakActive: agentStatus.isInActiveBreak,
      isShiftActive: agentStatus.isInActiveShift
    });

  }

  startBreak = async () => {
    if (!this.state.isBreakActive && this.state.isShiftActive) {
      this.setState((prevState: State) => ({
        isShiftActive: false,
        isBreakActive: true
      }), async () => {
        this.toggleFabButton();
        this.props.showUiLoader();
        await this.props.startAgentBreak(this.props.auth.user);
        this.props.hideUiLoader();
        Toast.show({
          text: 'Your break has been started!',
          duration: 3000
        });
      });
    }
  };

  startShift = async () => {
    if (this.state.isBreakActive && !this.state.isShiftActive) {
      this.setState((prevState: State) => ({
        isShiftActive: true,
        isBreakActive: false
      }), async () => {
        this.toggleFabButton();
        this.props.showUiLoader();

        await this.props.endAgentBreak(this.props.auth.user, this.props.breakInfo.breakId);
        this.props.hideUiLoader();
        Toast.show({
          text: 'Your shift has been started!',
          duration: 3000
        });
      });
    }
  };

  toggleFabButton = () => {
    this.setState(prevState => ({ isFabActionsActive: !prevState.isFabActionsActive }));
  };

  logout = async () => {
    this.props.showUiLoader();
    await this.props.logout();
    this.props.hideUiLoader();
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
            <TimerProgressCircle timerSeconds={this.state.isShiftActive ? 10 : 1}/>
          </View>
        </View>
        <Fab active={this.state.isFabActionsActive}
             direction='up'
             containerStyle={{}}
             style={styles.fabBtn}
             position='bottomRight'
             onPress={this.toggleFabButton}>
          <Icon name={'settings'} type={'MaterialIcons'}/>
          <Button style={styles.logoutBtn}
                  onPress={this.logout}>
            <Icon name={'log-out'} type={'Entypo'}/>
          </Button>
          <Button style={(!this.state.isShiftActive && this.state.isBreakActive) ? styles.startBreakBtnDisabled : styles.startBreakBtn}
                  disabled={!this.state.isShiftActive && this.state.isBreakActive}
                  onPress={this.startBreak}>
            <Icon name={'free-breakfast'} type={'MaterialIcons'}/>
          </Button>
          <Button style={(this.state.isShiftActive && !this.state.isBreakActive) ? styles.startShiftBtnDisabled : styles.startShiftBtn}
                  disabled={this.state.isShiftActive && !this.state.isBreakActive}
                  onPress={this.startShift}>
            <Icon name={'playcircleo'} type={'AntDesign'}/>
          </Button>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { auth, agent } = state;
  const { agentStatus, breakInfo } = agent;
  return { auth, agentStatus, breakInfo };
};

export default connect(mapStateToProps, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
  getAgentStatus: getAgentStatusAction,
  startAgentBreak: startAgentBreakAction,
  endAgentBreak: endAgentBreakAction,
  startAgentShiftAttendance: startAgentShiftAttendanceAction,
  endAgentShift: endAgentShiftAction,
  logout: logoutAction
})(requireAuth(HomeScreen));

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
  },
  fabBtn: {
    backgroundColor: colorConstants.BACKGROUND_PRIMARY
  },
  logoutBtn: {
    backgroundColor: colorConstants.TEXT_DANGER
  },
  startBreakBtn: {
    backgroundColor: '#1e90ff',
  },
  startBreakBtnDisabled: {
    backgroundColor: '#82ccdd',
  },
  startShiftBtn: {
    backgroundColor: '#2ed573',
  },
  startShiftBtnDisabled: {
    backgroundColor: '#7bed9f',
  }
});
