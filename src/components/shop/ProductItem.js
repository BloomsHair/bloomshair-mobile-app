import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
//constants
import Colors from '../../constants/Colors';

import Card from '../UI/Card';

export const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.productCard}>
      <TouchableComp activeOpacity={0.7} onPress={props.onSelect} useForeground>
        <View>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: props.prodData.imageUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.prodData.title}</Text>
            <Text style={styles.price}>£{props.prodData.price.toFixed(2)}</Text>
          </View>
          <View style={styles.buttonContainer}>{props.children}</View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  productCard: {
    height: 300,
    margin: 20,
  },
  imgContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.grey,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '20%',
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    height: '20%',
  },
});
