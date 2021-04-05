import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

//screens
import UserProductsScreen from '../../screens/user/UserProductsScreen';
import EditProductScreen from '../../screens/user/EditProductScreen';

// components
import CustomHeaderButton from '../../components/UI/HeaderButton';

//constants
import Colors from '../../constants/Colors';

const AdminNav = createStackNavigator();

const AdminNavigator = () => {
    return (
      <AdminNav.Navigator
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
        <AdminNav.Screen
          name='UserProducts'
          component={UserProductsScreen}
          options={({ navigation }) => ({
            headerTitle: 'Your Products',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title='Menu'
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title='Menu'
                  iconName={
                    Platform.OS === 'android' ? 'md-create' : 'ios-create'
                  }
                  onPress={() => {
                    navigation.navigate('EditProduct', {productId: ''});
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <AdminNav.Screen
          name='EditProduct'
          component={EditProductScreen}
          options={({ route }) => ({
            headerTitle: !!route.params.productId
              ? 'Edit Product'
              : 'Add Product',
          })}
        />
      </AdminNav.Navigator>
    );
}

export default AdminNavigator
