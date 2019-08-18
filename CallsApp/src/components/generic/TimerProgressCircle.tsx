import React, { Component } from 'react';
import CountdownCircle from 'react-native-countdown-circle'
import { colorConstants } from '../../constants';

interface Props {
  onCounterFinish?: Function;
  timerSeconds: number;
}
class TimerProgressCircle extends Component<Props> {

  state = {
    fill: 0
  };
  timer: number;

  componentDidMount(): void {
    this.timer = setInterval(() => {this.setState(ps => ({ fill: ps.fill + 1 }))}, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <CountdownCircle
        seconds={this.props.timerSeconds}
        radius={80}
        borderWidth={8}
        color={colorConstants.BACKGROUND_PRIMARY}
        bgColor={colorConstants.WHITE_SECONDARY}
        textStyle={{ fontSize: 20 }}
        onTimeElapsed={this.props.onCounterFinish}
      />
    );
  }
}

export default TimerProgressCircle;
