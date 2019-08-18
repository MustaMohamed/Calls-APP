import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AuthenticationScreen, HomeScreen, LoginScreen } from '../screens';

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthenticationScreen,
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppContainer;
