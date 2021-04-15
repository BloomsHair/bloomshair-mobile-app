import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => async (dispatch, getState) => {
  const userId = getState().user.userId;
  try {
    const response = await fetch(
      'https://rncompleteguide-904fe-default-rtdb.firebaseio.com/products.json'
    );

    if (!response.ok) {
      throw new Error('Somethin went wrong!');
    }
    const data = await response.json();

    const loadedProducts = [];
    for (const key in data) {
      loadedProducts.push(
        new Product(
          key,
          data[key].ownerId,
          data[key].ownerPushToken,
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(prod => prod.ownerId === userId) });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  const token = getState().user.token;
  const response = await fetch(
    `https://rncompleteguide-904fe-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Somethin went wrong!');
  }
  dispatch({ type: DELETE_PRODUCT, pId: productId });
};

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch, getState
) => {
  let pushToken;
  let updatedStatusObj;
  const statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (statusObj.status !== 'granted') {
    updatedStatusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  if (updatedStatusObj !== 'granted') {
    pushToken = null
  } else {
    pushToken = (await Notifications.getExpoPushTokenAsync()).data;
  }
  const token = getState().user.token;
  const userId = getState().user.userId;
  const response = await fetch(
    `https://rncompleteguide-904fe-default-rtdb.firebaseio.com/products.json?auth=${token}`,
    {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        ownerId: userId,
        ownerPushToken: pushToken
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Somethin went wrong!');
  }
  const data = await response.json();

  dispatch({
    type: CREATE_PRODUCT,
    productData: {
      id: data.name,
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
      ownerId: userId,
      pushToken: pushToken,
    },
  });
};
export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch,
  getState
) => {
  const token = getState().user.token
  console.log(token)
  const response = await fetch(
    `https://rncompleteguide-904fe-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        imageUrl: imageUrl,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Somethin went wrong!');
  }

  dispatch({
    type: UPDATE_PRODUCT,
    pId: id,
    productData: {
      title: title,
      description: description,
      imageUrl: imageUrl,
    },
  });
};
