import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  // only update state once we call dispatch, once proper action is passed
  // action is object passed to dispatch(), which object must have property by name of type (naming convention as in example), e.g.: dispatch({type: 'ADD_ITEM'})
  // once action is dispatched, need to handle it in reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const remove = (id) => {
    // calling it payload is a convention
    dispatch({ type: 'REMOVE', payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
