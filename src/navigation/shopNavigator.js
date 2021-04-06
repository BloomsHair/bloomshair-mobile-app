import React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

// redux/actions
import { logout } from '../redux/actions/authAction';

//navigators/shop
import ProductsNavigator from './shop/ProductsNavigator';
import OrdersNavigator from './shop/OrdersNavigator';

// navigator/user
import AdminNavigator from './user/AdminNavigator';

//constants
import Colors from '../constants/Colors';

const ShopNav = createDrawerNavigator();

const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopNav.Navigator
      drawerStyle={{
        backgroundColor:
          Platform.OS === 'android' ? Colors.primary : Colors.white,
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor:
          Platform.OS === 'android' ? Colors.white : Colors.primary,
        itemStyle: { marginVertical: 5 },
        labelStyle: { fontFamily: 'open-sans-bold' },
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={{ flex: 1 }}>
              <SafeAreaView
                forceInset={{ top: 'always', horizontal: 'never ' }}>
                <Button
                  title='Logout'
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(logout());
                  }}
                />
              </SafeAreaView>
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <ShopNav.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerLabel: 'Products',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <ShopNav.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerLabel: 'Orders',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <ShopNav.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerLabel: 'Admin',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
    </ShopNav.Navigator>
  );
};

export default ShopNavigator;
