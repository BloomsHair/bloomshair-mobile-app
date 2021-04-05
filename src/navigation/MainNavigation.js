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
  const userToken = useSelector((state) => !!state.user.token);
  return (
    <NavigationContainer>
      <MainNav.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <MainNav.Screen name='Auth' component={AuthNavigator} />
        <MainNav.Screen name='Startup' component={StartupScreen} />

        <MainNav.Screen name='Shop' component={ShopNavigator} />
      </MainNav.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
