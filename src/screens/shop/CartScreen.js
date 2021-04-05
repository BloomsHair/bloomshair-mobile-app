import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//components
import CartItem from '../../components/shop/CartItem';

//constants
import Colors from '../../constants/Colors';

// redux/actions
import { removeFromCart } from '../../redux/actions/cartAction';
import { addOrder } from '../../redux/actions/ordersAction';

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.items) {
      transformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size='small' color={Colors.primary} />
          </View>
        ) : (
          <Button
            color={Colors.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>

      {cartItems.length > 0 && (
        <View style={styles.summary}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => (
              <CartItem
                data={itemData.item}
                deletable
                onRemove={() => {
                  dispatch(removeFromCart(itemData.item.productId));
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
