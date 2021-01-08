import { combineReducers } from "redux"
import authReducer from "./auth"
import collectionsReducer from "./collections"
import productsReducer from "./products"


const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers will go here later
  coll: collectionsReducer,
  prods: productsReducer
})
export default rootReducer
