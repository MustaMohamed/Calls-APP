import React, { Component } from 'react';
import { Container, Button, Text, Form, Item, Label, Input, Content } from 'native-base';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { AuthState, ValidationField } from '../types';
import {  login, showUiLoader, hideUiLoader } from '../redux-store/actions';
import { colorConstants, validationConstants } from '../constants';
import {  validateInput } from '../services';
import { StyleSheet } from 'react-native';

interface Props extends AuthState {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  login: typeof login;
  showUiLoader?: typeof showUiLoader;
  hideUiLoader?: typeof hideUiLoader;
}

interface State {
  userName: ValidationField;
  password: ValidationField;
  formError: boolean;
  requestTime: number;

  [key: string]: any;
}

class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formError: false,
      requestTime: 0,
      userName: {
        value: '',
        validationTypes: [
          validationConstants.NOT_EMPTY,
          validationConstants.CONTAINS_SPECIAL_CHARACTERS
        ],
        hasError: false
      },
      password: {
        value: '',
        validationTypes: [
          validationConstants.NOT_EMPTY,
        ],
        hasError: false
      }
    };
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.isAuthenticated) {
      this.props.hideUiLoader();
      this.props.navigation.navigate('Home');
    }
  }

  componentDidMount(): void {

  }

  onUsernameChange = (text: string) => {
    const { userName } = this.state;
    this.setState({ userName: Object.assign({}, userName, { value: text }) });
  };

  onPasswordChange = (text: string) => {
    const { password } = this.state;
    this.setState({ password: Object.assign({}, password, { value: text }) });
  };

  handleUserLogin = () => {
    this.props.showUiLoader();
    const { userName, password } = this.state;
    let user = {
      userName: userName.value,
      password: password.value,
      loginDate: (new Date()).toLocaleString()
    };
    if (this._formValidation()) {
      this.setState({ requestTime: (new Date).getTime() });
      this.login(user);
    } else {
      this.props.hideUiLoader();
      Alert.alert('Error', 'Please enter correct username and password!');
    }
  };

  _formValidation = () => {
    let itemsToValidateKeys = ['userName', 'password'], validForm = true;
    for (let i = 0; i < itemsToValidateKeys.length; i++) {
      let key = itemsToValidateKeys[i], validKey = true;
      validKey = validateInput(this.state[key].validationTypes, this.state[key].value);
      this.setState({ [key]: Object.assign({}, this.state[key], { hasError: !validKey }) });
      if (!validKey)
        validForm = false;
    }
    this.setState({ formError: !validForm });
    return validForm;
  };

  login = (user: {}) => {
    // this.props.showUiLoader();
    this.props.login(user);
  };

  componentWillUnmount(): void {
  }

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.container}>
          <Form style={styles.form}>
            {this.state.formError && <Text style={[styles.textError, styles.textCenter]}>
                Please enter correct username and password
            </Text>}
            <Item floatingLabel
                  style={[styles.formItem,
                    (this.state.formError && this.state.userName.hasError) ?
                      { ...(styles.itemError), ...(styles.textError) } : null]}
                  error={this.state.formError && this.state.userName.hasError}>
              <Label
                style={[styles.inputText,
                  (this.state.formError && this.state.userName.hasError) ?
                    { ...(styles.itemError), ...(styles.textError) } : null]}>
                Username
              </Label>
              <Input onChangeText={this.onUsernameChange}/>
            </Item>
            <Item floatingLabel
                  style={[styles.formItem,
                    (this.state.formError && this.state.password.hasError) ?
                      { ...(styles.itemError), ...(styles.textError) } : null]}
                  error={this.state.formError && this.state.password.hasError}>
              <Label
                style={[styles.inputText,
                  (this.state.formError && this.state.password.hasError) ?
                    { ...(styles.itemError), ...(styles.textError) } : null]}>
                Password</Label>
              <Input secureTextEntry={true} onChangeText={this.onPasswordChange}/>
            </Item>
            <Button full rounded large style={styles.button} onPress={this.handleUserLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { auth } = state;
  return auth;
};
export default connect(mapStateToProps, { login, showUiLoader, hideUiLoader })(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstants.WHITE_SECONDARY,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  form: {},
  formItem: {
    marginVertical: 20,
    borderColor: colorConstants.BACKGROUND_SECONDARY,
    marginLeft: 0,
  },
  itemError: {
    borderColor: colorConstants.TEXT_DANGER,
  },
  textError: {
    color: colorConstants.TEXT_DANGER
  },
  textCenter: {
    textAlign: 'center'
  },
  inputText: {
    color: colorConstants.BACKGROUND_PRIMARY,
    paddingLeft: 5,
    paddingTop: 0
  },
  input: {},
  button: {
    marginTop: 50,
    backgroundColor: colorConstants.BACKGROUND_SECONDARY,
  },
  buttonText: {
    color: colorConstants.WHITE_SECONDARY,
    fontWeight: 'bold',
    fontSize: 22
  }
});
