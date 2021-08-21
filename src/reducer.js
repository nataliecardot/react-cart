// once action is dispatched, need to handle it in reducer
// state is current state before update, action is what we're trying to do (the action of a specific type dispatched by dispatch() function)
// must always return updated state (...state, newState)
const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case 'INCREASE':
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    case 'DECREASE':
      let tempCart2 = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        // only keep items that are above zero (prevents negative number)
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart2 };
    default:
      return state;
  }
};

export default reducer;
