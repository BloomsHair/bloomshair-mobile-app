import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartAction';
import { ADD_ORDER } from '../actions/ordersAction';
import CartItem from '../../models/cartItem';
import { DELETE_PRODUCT } from '../actions/productsAction';
const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;

      let cartItem;
      if (state.items[addedProduct.id]) {
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          pushToken,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        cartItem = new CartItem(1, prodPrice, prodTitle, pushToken, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
       const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
       );
        updatedCartItems = { ...state.items, [action.pId]: updatedCartItem}
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
    case ADD_ORDER:
      return initialState
    case DELETE_PRODUCT:
      if (!state.items[action.pId]) {
        return state;
      }
      const updatedItems = { ...state.items }
      const itemTotal = state.items[action.pId].sum
      delete updatedItems[action.pId]
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }
    default:
      return state;
  }
};

export default cartReducer;
