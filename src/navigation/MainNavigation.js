import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

//screen
import StartupScreen from '../screens/StartupScreen';

//navigators/shop
import ShopNavigator from './shopNavigator';

// navigation/Auth
import AuthNavigator from './auth/AuthNavigator';

//constants
import Colors from '../constants/Colors';

const MainNav = createStackNavigator();

const MainNavigator = () => {
  const isAuth = useSelector((state) => !!state.user.token);
  const isAL = useSelector((state) => state.user.isAutoLoggedIn);
  return (
    <NavigationContainer>
          {isAuth && <ShopNavigator />}
          {!isAuth && !isAL && <AuthNavigator />}
          {!isAuth && isAL && <StartupScreen />}
    </NavigationContainer>
  );
};

export default MainNavigator;
