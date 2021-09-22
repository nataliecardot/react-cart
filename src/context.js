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

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  // fetches one of the cart items, Samsung Galaxy S8
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url); // url defined at top of file
    const cart = await response.json();
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart, loading: false });
  };

  // with empty dependency array, only called when app renders
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
