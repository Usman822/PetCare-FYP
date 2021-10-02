import { combineReducers } from "redux";
import favouritesReducer from "./FavItems";
import cartItemsReducer from "./CartItem";
export default reducer = combineReducers({
  cartItemsReducer,
  favouritesReducer,
});
