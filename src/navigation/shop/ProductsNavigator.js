import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

//screens
import ProductsOverViewScreen from '../../screens/shop/ProductOverViewScreen';
import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import CartScreen from '../../screens/shop/CartScreen';

// components
import CustomHeaderButton from '../../components/UI/HeaderButton';

//constants
import Colors from '../../constants/Colors';

const ProductsNav = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsNav.Navigator
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
      <ProductsNav.Screen
        name='ProductsOverView'
        component={ProductsOverViewScreen}
        options={({ navigation }) => ({
          headerTitle: 'All Products',
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
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ProductsNav.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.productTitle,
        })}
      />
      <ProductsNav.Screen
        name='Cart'
        component={CartScreen}
        options={{
          headerTitle: 'Your Cart',
        }}
      />
    </ProductsNav.Navigator>
  );
};

export default ProductsNavigator;
