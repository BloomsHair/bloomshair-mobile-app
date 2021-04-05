import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons} from '@expo/vector-icons'

// screens
import OrderScreen from '../../screens/shop/OrdersScreen';

//constants
import Colors from '../../constants/Colors'

// components
import CustomHeaderButton from '../../components/UI/HeaderButton'

const OrderNav = createStackNavigator();

const OrdersNavigator = () => {
    return (
      <OrderNav.Navigator
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
        <OrderNav.Screen
          name='Orders'
          component={OrderScreen}
          options={({ navigation }) => ({
            headerTitle: 'Your Orders',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title='Cart'
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            drawerIcon: drawerConfig => ( <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />)
          })}
        />
      </OrderNav.Navigator>
    );
}

export default OrdersNavigator
