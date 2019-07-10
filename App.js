import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import homeScreen from './app/screens/homeScreen.js';
import searchScreen from './app/screens/searchScreen.js';

const App = createBottomTabNavigator({
  Home: { screen: homeScreen },
  Search: { screen: searchScreen }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default createAppContainer(App);