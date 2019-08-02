import React, { Component } from 'react';
import { Container, Button, Text, View, Form, Item, Icon, Label, Input, Content } from 'native-base';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { AuthState, ValidationField } from '../types';
import { checkAuthentication, login } from '../redux-store/actions';
import { validationConstants } from '../constants';
import { validateInput } from '../services';
import { StyleSheet } from 'react-native';

interface Props extends AuthState {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  login: typeof login;
  checkAuthentication?: typeof checkAuthentication;
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


  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('Home');
    }
  }

  componentDidMount(): void {
    if (this.props.isAuthenticated) {
      // this.props.navigation.navigate('Home');
    }
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
    const { userName, password } = this.state;
    let user = {
      userName: userName.value,
      password: password.value,
      loginDate: (new Date()).toLocaleString()
    };
    if (this._formValidation()) {
      this.setState({ requestTime: (new Date).getTime() });
      this.login(user);
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
    this.props.login(user);
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.container}>
          <Form style={styles.form}>
            <Item floatingLabel
                  style={[styles.formItem, (this.state.formError && this.state.userName.hasError) ? styles.itemError : {}]}
                  error={this.state.formError && this.state.userName.hasError}>
              <Label
                style={[styles.inputText, (this.state.formError && this.state.userName.hasError) ? styles.itemError : null]}>
                Username
              </Label>
              <Input onChangeText={this.onUsernameChange}/>

            </Item>
            <Item floatingLabel
                  style={[styles.formItem, (this.state.formError && this.state.password.hasError) ? styles.itemError : {}]}
                  error={this.state.formError && this.state.password.hasError}>

              <Label
                style={[styles.inputText, (this.state.formError && this.state.password.hasError) ? styles.itemError : {}]}>Password</Label>

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
export default connect(mapStateToProps, { checkAuthentication: checkAuthentication, login })(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  form: {},
  formItem: {
    marginVertical: 20,
    borderColor: '#2c3e50',
    marginLeft: 0,
  },
  itemError: {
    borderColor: '#e74c3c',
    color: '#e74c3c'
  },
  inputText: {
    color: '#34495e',
    paddingLeft: 5,
    paddingTop: 0
  },
  input: {},
  button: {
    marginTop: 50,
    backgroundColor: '#2c3e50',
  },
  buttonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: 22
  }
});


/*
*    <Container style={styles.container}>
        <View>
          <Form style={styles.form}>
            <Item floatingLabel style={styles.formItem}
                  error={this.state.formError && this.state.userName.hasError}>
              <Icon active type='FontAwesome' name='user'/>
              <Label
                style={[styles.inputText, (this.state.formError && this.state.userName.hasError) ? styles.itemError : {}]}>Username</Label>
              <Input onChangeText={this.onUsernameChange}/>
            </Item>
            <Item floatingLabel
                  style={[styles.formItem, (this.state.formError && this.state.password.hasError) ? styles.itemError : {}]}
                  error={this.state.formError && this.state.password.hasError}>
              <Icon active type='FontAwesome' name='unlock-alt'/>

              <Label
                style={[styles.inputText, (this.state.formError && this.state.password.hasError) ? styles.itemError : {}]}>Password</Label>

              <Input secureTextEntry={true} onChangeText={this.onPasswordChange}/>
            </Item>
          </Form>

          <Button full rounded large style={styles.button} onPress={this.handleUserLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Button>
        </View>

      </Container>
* */
