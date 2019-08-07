import React, { Component } from 'react';
import { View } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';
import { AuthState } from '../types/redux-store';
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { checkAuthentication } from '../redux-store/actions';
import { isEmpty } from '../services';
import { connect } from 'react-redux';


interface Props extends AuthState {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  isAuthenticated: boolean;
  user: {};
  checkAuthentication?: typeof checkAuthentication;
}

class SplashScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.tm = undefined;
  }

  async componentDidMount(): void {
    this.props.checkAuthentication();
    // await this.handleAuthentication();
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    this.tm = setTimeout(async () => {await this.handleAuthentication();}, 1000);
  }

  componentWillUnmount(): void {
    console.log('unmounted');
    if (this.tm) {
      clearTimeout(this.tm);
    }
  }

  handleAuthentication = async () => {
    if (this.props.isAuthenticated) {
      const authUser = this.props.user;
      if (isEmpty(authUser)) {
        console.log('Update ==> Auth => ', this.props.isAuthenticated, ' user => ', authUser);
        this.props.logout();
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('Home');
      }
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/splash.png')} style={styles.backgroundImage}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  console.log(state);
  return auth;
};
export default connect(mapStateToProps, { checkAuthentication })(SplashScreen);

const
  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    }
  });
