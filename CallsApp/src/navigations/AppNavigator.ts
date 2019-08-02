import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, LoginScreen } from '../screens';

const AppNavigator =  createAppContainer(createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
));

export default AppNavigator;
