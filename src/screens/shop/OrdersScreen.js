import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, ActivityIndicator, View, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// redux/actions
import { fetchOrder } from '../../redux/actions/ordersAction';
//component
import OrderItem from '../../components/shop/OrderItem'

//constants
import Colors from '../../constants/Colors';


const OrdersScreen = () => {
      const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders)

    const loadOrders = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(fetchOrder());
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
      loadOrders();
    }, [loadOrders]);


    if (error) {
      return (
        <View style={styles.centered}>
          <Text>An error occurred</Text>
          <Button
            title='Try Again'
            onPress={loadOrders}
            color={Colors.primary}
          />
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      );
    }
  
  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products found!!!</Text>
      </View>
    );
  }


    return (
        <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => <OrderItem data={itemData.item} />} />
    )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersScreen
