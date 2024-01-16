import { ADD_PLACES, GET_ALL_PLACES } from "../actionTypes/placeActionTypes";

const initialState = {
  placeList: []
};

/**
 * Handle Place Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACES:
      return { ...state, placeList: [...state.placeList, action.payload] };
    case GET_ALL_PLACES:
      return {
        ...state,
        placeList: action.payload.map(place => ({
          ...place,
          image: place.imageUri
        }))
      };
    default:
      return state;
  }
};
