import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

//screens
import AuthScreen from '../../screens/user/AuthScreen';


// components
import CustomHeaderButton from '../../components/UI/HeaderButton';

//constants
import Colors from '../../constants/Colors';

const AuthNav = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? Colors.primary : Colors.white,
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans',
        },
        headerTintColor:
          Platform.OS === 'android' ? Colors.white : Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AuthNav.Screen
        name='Auth'
        component={AuthScreen}
        options={({ navigation }) => ({
          headerTitle: 'Authentication',
        })}
      />
    </AuthNav.Navigator>
  );
};

export default AuthNavigator;
