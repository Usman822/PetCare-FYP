export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const EMPTY_CART = "EMPTY_CART";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_SAVED = "REMOVE_FROM_SAVED";

const initialState = {
  cart: null,
  saved: null,
};

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    case REMOVE_FROM_CART:
      return cart.filter((cartItem) => cartItem.id !== action.payload.id);
    case EMPTY_CART:
      return { ...state, cart: [] };
    case ADD_TO_FAVOURITE:
      return { ...state, saved: action.payload };
    case REMOVE_FROM_SAVED:
      return cart.filter((saved) => saved.id !== action.payload.id);
  }
  return state;
};

export default cartItemsReducer;
