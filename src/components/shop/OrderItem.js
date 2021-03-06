import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Card from '../UI/Card';

import CartItem from './CartItem';

import Colors from '../../constants/Colors';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>Total: ${props.data.totalAmount}</Text>
        <Text style={styles.date}>{props.data.readableDate}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.cartItem}>
          {props.data.items.map((cartItem) => (
            <CartItem key={cartItem.productId} data={cartItem} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },

  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: Colors.grey,
  },
  cartItem: {
    width: '100%',
  },
});

export default OrderItem;
