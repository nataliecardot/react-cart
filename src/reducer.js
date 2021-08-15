// once action is dispatched, need to handle it in reducer
// state is current state before update, action is what we're trying to do (the action of a specific type dispatched by dispatch() function)
// must always return updated state (...state, newState)
const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default reducer;
