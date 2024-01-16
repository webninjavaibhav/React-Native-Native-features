import { ADD_PLACES, GET_ALL_PLACES } from "../actionTypes/placeActionTypes";
import { insertPlace, getAllPlaces } from "../../helpers/Db";

export const addPlaceAction = (title, image, selectedLocation) => {
  return async dispatch => {
    /**
     * Call below api to get address based on lat, lng
     * https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=YOUR_API_KEY
     */

    /**
     * Call insert place query
     */

    // This will come from geocode api whic mention above
    const address = "Dummy Place";

    const insertResult = await insertPlace(
      title,
      image,
      address,
      selectedLocation.lat,
      selectedLocation.lng
    );
    dispatch({
      type: ADD_PLACES,
      payload: {
        id: insertResult.insertId,
        title,
        image,
        address,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng
      }
    });
  };
};

/**
 * Handle get all places action
 */
export const getAllPlacesAction = () => {
  return async dispatch => {
    /**
     * Call get all paces query
     */
    const getPlacesResult = await getAllPlaces();
    dispatch({
      type: GET_ALL_PLACES,
      payload: getPlacesResult.rows._array
    });
  };
};
