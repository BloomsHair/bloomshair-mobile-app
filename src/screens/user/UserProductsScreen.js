import React from 'react';
import { FlatList, Button, Alert, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// components
import { ProductItem } from '../../components/shop/ProductItem';

// constants
import Colors from '../../constants/Colors';

// redux/actions
import { deleteProduct } from '../../redux/actions/productsAction'


const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);
  const editHandler = (id, title) => {
    navigation.navigate('EditProduct', {
      productId: id,
      productTitle: title,
    });
  };
    
    const deleteHandler = (id) => {
      Alert.alert('Are you sure?', 'Do you want to delete this item?', [
        { text: 'No', style: 'default' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteProduct(id));
          },
        },
      ]);
    };
  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products found!!!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          prodData={itemData.item}
          onSelect={() => {
            editHandler(itemData.item.id, itemData.item.title);
          }}
          onAddToCart={() => {
            dispatch(addToCart(itemData.item));
          }}>
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={deleteHandler.bind(this, itemData.item.id)}
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

export default UserProductsScreen;
