import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home';

class Application extends Component {
  render() {
    return (
      <View>
        <Home/>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Application;
