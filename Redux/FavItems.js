export const ADD_TO_FAV = "ADD_TO_FAV";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";

const initialState = [];

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return [...state, action.payload];
    case REMOVE_FROM_FAV:
      return state.filter((cartItem) => cartItem.id !== action.payload.id);
  }
  return state;
};
export default favouritesReducer;
