import Order from '../../models/order';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrder = () => async (dispatch, getState) => {
  const userId = getState().user.userId;
  try {
    const response = await fetch(
      `https://rncompleteguide-904fe-default-rtdb.firebaseio.com/orders/${userId}.json`
    );

    if (!response.ok) {
      throw new Error('Somethin went wrong!');
    }
    const data = await response.json();
    const loadedOrders = [];
    for (const key in data) {
      loadedOrders.push(
        new Order(
          key,
          data[key].cartItems,
          data[key].totalAmount,
          new Date(data[key].date)
        )
      );
    }
    
    dispatch({ type: SET_ORDERS, orders: loadedOrders})
  } catch (error) {
    throw error;
  }
}

export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
  const token = getState().user.token;
  const userId = getState().user.userId;
  const date = new Date()
  const response = await fetch(
    `https://rncompleteguide-904fe-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Somethin went wrong!');
  }
  const data = await response.json();
  dispatch({
    type: ADD_ORDER,
    orderData: { id: data.name, items: cartItems, amount: totalAmount, date: date }
  })
};
