import { combineReducers } from "redux"
import authReducer from "./auth"
import collectionsReducer from "./collections"


const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers will go here later
  coll: collectionsReducer,
})
export default rootReducer
