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
    case 'GET_TOTALS':
      let { total, amount } = state.cart.reduce(
        // cartTotal is the accumulator/prevValue, cartItem is current value being iterated over
        (cartTotal, cartItem) => {
          // Reducer callback function (value returned is stored in cartTotal [updated with each iteration])
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          // cartTotal is an object; on that object we have amount property; with each iteration add amount (of current cart item being processed)
          cartTotal.amount += amount;
          return cartTotal;
        },
        // Initial value (to which accumulator/prevValue is initialized first time reduce's callback is called)
        {
          total: 0,
          amount: 0,
        }
      );
      // Limiting number of decimals. toFixed() returns a string so must pass through parseFloat
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    default:
      return state;
  }
};

export default reducer;
