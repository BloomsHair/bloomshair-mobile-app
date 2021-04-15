import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// navigations
import MainNavigator from './src/navigation/MainNavigation'

// reducers
import productReducer from './src/redux/reducers/productReducer';
import cartReducer from './src/redux/reducers/cartReducer';
import ordersReducer from './src/redux/reducers/ordersReducer';
import authReducer from './src/redux/reducers/authReducer';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true }
  }
})

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  user: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}


