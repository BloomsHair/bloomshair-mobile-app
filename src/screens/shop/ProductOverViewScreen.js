import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//component
import { ProductItem } from '../../components/shop/ProductItem';

//constants
import Colors from '../../constants/Colors';

// redux/actions
import { addToCart } from '../../redux/actions/cartAction';
import { fetchProducts } from '../../redux/actions/productsAction';

const ProductOverViewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  const onSelectHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true)
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);
    return () => {
      willFocusSub();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    });
  }, [loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred</Text>
        <Button
          title='Try Again'
          onPress={loadProducts}
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

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products found!!!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          prodData={itemData.item}
          onSelect={() => {
            onSelectHandler(itemData.item.id, itemData.item.title);
          }}>
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              onSelectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => {
              dispatch(addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductOverViewScreen;
