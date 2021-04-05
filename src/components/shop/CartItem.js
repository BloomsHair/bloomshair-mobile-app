import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CartItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.data.quantity} </Text>
        <Text style={styles.text}>{props.data.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.text}>${props.data.sum.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableComp onPress={props.onRemove} style={styles.deleteBtn}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color={Colors.red}
            />
          </TouchableComp>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: Colors.grey,
    fontSize: 16,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },

  deleteBtn: {
    marginLeft: 20,
  },
});

export default CartItem;
