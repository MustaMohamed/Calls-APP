import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, LoginScreen } from '../screens';
import SplashScreen from '../screens/Splash';

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppContainer;
