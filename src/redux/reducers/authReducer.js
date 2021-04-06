import { AUTHENTICATE, LOGOUT, SET_IS_AL } from '../actions/authAction';

const initialState = {
  token: null,
  userId: null,
  isAuthLoggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        isAuthLoggedIn: true,
      };
    case SET_IS_AL:
      return {
        ...state,
        isAuthLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        isAuthLoggedIn: true,
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};

export default authReducer;
