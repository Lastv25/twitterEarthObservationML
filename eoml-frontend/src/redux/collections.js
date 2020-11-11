import initialState from "./initialState"
import apiClient from "../services/apiClient"


export const CREATE_COLLECTION = "@@collections/CREATE_COLLECTION"
export const CREATE_COLLECTION_SUCCESS = "@@collections/CREATE_COLLECTION_SUCCESS"
export const CREATE_COLLECTION_FAILURE = "@@collections/CREATE_COLLECTION_FAILURE"


export default function collectionsReducer(state = initialState.collections, action = {}) {
  switch (action.type) {
    case CREATE_COLLECTION:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          [action.data.id]: action.data,
        },
      }
    case CREATE_COLLECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}
export const Actions = {}

Actions.createCollection = ({ new_collection }) => {
  return apiClient({
    url: `/collections/`,
    method: `POST`,
    types: {
      REQUEST: CREATE_COLLECTION,
      SUCCESS: CREATE_COLLECTION_SUCCESS,
      FAILURE: CREATE_COLLECTION_FAILURE,
    },
    options: {
      data: { new_collection },
      params: {},
    },
  })
}
