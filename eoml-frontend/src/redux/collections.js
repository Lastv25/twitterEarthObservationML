import initialState from "./initialState"
import apiClient from "../services/apiClient"


export const CREATE_COLLECTION = "@@collections/CREATE_COLLECTION"
export const CREATE_COLLECTION_SUCCESS = "@@collections/CREATE_COLLECTION_SUCCESS"
export const CREATE_COLLECTION_FAILURE = "@@collections/CREATE_COLLECTION_FAILURE"

export const FETCH_COLLECTIONS = "@@collections/FETCH_COLLECTIONS"
export const FETCH_COLLECTIONS_SUCCESS = "@@collections/FETCH_COLLECTIONS_SUCCESS"
export const FETCH_COLLECTIONS_FAILURE = "@@collections/FETCH_COLLECTIONS_FAILURE"

export const FETCH_COLLECTIONS_BY_ID = "@@collections/FETCH_COLLECTIONS_BY_ID"
export const FETCH_COLLECTIONS_BY_ID_SUCCESS = "@@collections/FETCH_COLLECTIONS_BY_ID_SUCCESS"
export const FETCH_COLLECTIONS_BY_ID_FAILURE = "@@collections/FETCH_COLLECTIONS_BY_ID_FAILURE"

export const CLEAR_CURRENT_COLLECTION = "@@collections/CLEAR_CURRENT_COLLECTION"

export const DELETE_CURRENT_COLLECTION = "@@collections/DELETE_CURRENT_COLLECTION"
export const DELETE_CURRENT_COLLECTION_SUCCESS = "@@collections/DELETE_CURRENT_COLLECTION_SUCCESS"
export const DELETE_CURRENT_COLLECTION_FAILURE = "@@collections/DELETE_CURRENT_COLLECTION_FAILURE"

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
    case FETCH_COLLECTIONS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.data
      }
    case FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        data: {}
      }
    case FETCH_COLLECTIONS_BY_ID:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_COLLECTIONS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        current_collection: action.data
      }
    case FETCH_COLLECTIONS_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        current_collection: {}
      }
    case DELETE_CURRENT_COLLECTION:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_CURRENT_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        current_collection: null
      }
    case DELETE_CURRENT_COLLECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        current_collection: action.data
      }
    case CLEAR_CURRENT_COLLECTION:
      return {
        ...state,
        current_collection: null
      }
    default:
      return state
  }
}
export const Actions = {}

Actions.createCollection = ({ new_collection }) => {
  return apiClient({
    url: `/collections/me/`,
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

Actions.fetchCollections = () => {
  return apiClient({
    url: `/collections/me/`,
    method: `GET`,
    types: {
      REQUEST: FETCH_COLLECTIONS,
      SUCCESS: FETCH_COLLECTIONS_SUCCESS,
      FAILURE: FETCH_COLLECTIONS_FAILURE,
    },
    options: {
      data: {},
      params: {},
    },
  })
}

Actions.clearCurrentCollection = () => ({ type: CLEAR_CURRENT_COLLECTION })

Actions.fetchCollectionById = ({ collection_id }) => {
  return apiClient({
    url: `/collections/me/${collection_id}/`,
    method: `GET`,
    types: {
      REQUEST: FETCH_COLLECTIONS_BY_ID,
      SUCCESS: FETCH_COLLECTIONS_BY_ID_SUCCESS,
      FAILURE: FETCH_COLLECTIONS_BY_ID_FAILURE,
    },
    options: {
      data: {},
      params: {},
    },
  })
}

Actions.deleteCollectionById = ({ collection_id }) => {
  return apiClient({
    url: `/collections/me/${collection_id}`,
    method: `DELETE`,
    types: {
      REQUEST: DELETE_CURRENT_COLLECTION,
      SUCCESS: DELETE_CURRENT_COLLECTION_SUCCESS,
      FAILURE: DELETE_CURRENT_COLLECTION_FAILURE,
    },
    options: {
      data: { collection_id },
      params: {},
    },
  })
}