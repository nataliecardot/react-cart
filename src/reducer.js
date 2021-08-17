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
    default:
      return state;
  }
};

export default reducer;
