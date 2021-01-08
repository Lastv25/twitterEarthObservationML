import initialState from "./initialState"
import apiClient from "../services/apiClient"


export const FETCH_PRODUCTS = "@@collections/FETCH_PRODUCTS"
export const FETCH_PRODUCTS_SUCCESS = "@@collections/FETCH_PRODUCTS_SUCCESS"
export const FETCH_PRODUCTS_FAILURE = "@@collections/FETCH_PRODUCTS_FAILURE"

export default function productsReducer(state = initialState.prods, action = {}) {
    switch (action.type) {
        case FETCH_PRODUCTS:
          return {
            ...state,
            isLoading: true
          }
        case FETCH_PRODUCTS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            error: null,
            data: action.data
          }
        case FETCH_PRODUCTS_FAILURE:
          return {
            ...state,
            isLoading: false,
            error: action.error,
            data: {}
          }
        default:
            return state
    }
}
export const Actions = {}

Actions.fetchProducts = ({ collection_id }) => {
  return apiClient({
    url: `/products/products/${collection_id}`,
    method: `GET`,
    types: {
      REQUEST: FETCH_PRODUCTS,
      SUCCESS: FETCH_PRODUCTS_SUCCESS,
      FAILURE: FETCH_PRODUCTS_FAILURE,
    },
    options: {
      data: {},
      params: {},
    },
  })
}