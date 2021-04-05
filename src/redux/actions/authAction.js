import AsyncStorage from '@react-native-async-storage/async-storage';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

const storeData = async (token, userId, expirationDate) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString(),
      })
    );
  } catch (e) {
    throw e;
  }
};


export const authenticate = (userId, token, expiryTime) => async  (dispatch) => {
  await dispatch(setLogoutTimer(expiryTime))
  await dispatch({ type: AUTHENTICATE, userId: userId, token: token });
};

export const signup = (email, password) => async (dispatch) => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHBrE1LCxhXYMftY7mzmwuld8yjrqItzc',
    {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  if (!response.ok) {
    const errorResdata = await response.json();
    const errorId = errorResdata.error.message;
    let message = 'Something went wrong!';
    if (errorId === 'EMAIL_EXISTS') {
      message = 'The email exists already';
    }
    throw new Error(message);
  }
  const data = await response.json();

  dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
  const expirationDate = new Date(
    new Date().getTime() + parseInt(data.expiresIn) * 1000
  );
  storeData(data.idToken, data.localId, expirationDate);
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHBrE1LCxhXYMftY7mzmwuld8yjrqItzc',
    {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  if (!response.ok) {
    const errorResdata = await response.json();
    const errorId = errorResdata.error.message;
    let message = 'Something went wrong!';
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'The email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!';
    }
    throw new Error(message);
  }

  const data = await response.json();

  dispatch(
    authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
  );
  const expirationDate = new Date(
    new Date().getTime() + parseInt(data.expiresIn) * 1000
  );
  storeData(data.idToken, data.localId, expirationDate);
};

export const logout = () => async (dispatch) => {
  try {
    clearLogoutTimer();
    await AsyncStorage.removeItem('@MyApp_key');
    dispatch({ type: LOGOUT });
  } catch (e) {
    throw e;
  }
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => async (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};
