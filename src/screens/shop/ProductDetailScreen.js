import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// constant
import Colors from '../../constants/Colors';

// redux/actions
import { addToCart } from '../../redux/actions/cartAction'

const ProductDetailScreen = ({ route, navigation }) => {
  const productId = route.params.productId;
  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.btnActions}>
        <Button color={Colors.primary} title='Add To Cart' onPress={() => {
          dispatch(addToCart(selectedProduct));
        }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.price}>£{selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productDetailScreen: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: Colors.grey,
    fontFamily: 'open-sans-bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'open-sans',
  },
  btnActions: {
    marginVertical: 20,
    alignItems: 'center',
  },
});
export default ProductDetailScreen;
