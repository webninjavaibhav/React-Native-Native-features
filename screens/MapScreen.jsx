/**
 * Using react-native-maps we can load maps
 * For more info visit: https://github.com/react-native-community/react-native-maps
 */

import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { isAndroid } from "../common/plateformChecker";
import HeaderButton from "../components/HeaderButtons";
import { useRoute } from "@react-navigation/native";

const MapScreen = props => {
  /**
   * Handle state for location
   */
  const [selectedLocation, setSelectedLocation] = useState();

  /**
   * Get route from naviagtion
   */
  const route = useRoute();

  /**
   * Initial location at view purpose
   */
  const initialLocation = route.params && route.params.initialLocation;

  useEffect(() => {
    if (route.params && route.params.initialLocation) {
      setSelectedLocation(route.params.initialLocation);
    }
  }, [route.params]);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  /**
   * Handle select location
   */
  const selectLocationHandler = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  let markerCordinates;

  if (selectedLocation) {
    markerCordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  const savepickedLocationhandler = useCallback(() => {
    /**
     * It will note open new activity for newPlace instaed in will go back on newPlace screen becuase it is already in stack
     * with props.navigation.push('', {}) you can open newPlace screen again
     */
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("newPlace", {
      pickedLocation: selectedLocation
    });
  }, [props.navigation, selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savepickedLocationhandler
    });
  }, [savepickedLocationhandler]);

  return (
    <MapView
      style={mapStyle.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCordinates && (
        <Marker title="Picked location" coordinate={markerCordinates}></Marker>
      )}
    </MapView>
  );
};

const mapStyle = StyleSheet.create({
  map: {
    flex: 1
  }
});

/**
 * Export navigationOptions from here and import in navigation file to use it
 * Erliear we set like 
 * Ex.
 <ScreenName>.navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderButtons
        HeaderButtonComponent={HeaderButton}
    >
        <Item iconName='ios-menu' title='menu' onPress={() => { navigation.toggleDrawer(); }} />
    </HeaderButtons>
}) 
 * But in new react navigation v5 we have to export like one function 
 * https://reactnavigation.org/docs/header-buttons#adding-a-button-to-the-header
 * in options props of stack we have to pass this function above link show how we can set options 
 * @param {object} navData
 */
export const mapMyOptions = navData => ({
  title: "Select Location",
  headerRight: () =>
    navData.route && navData.route.params && navData.route.params.readOnly ? (
      <React.Fragment />
    ) : (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save Place"
          iconName={isAndroid() ? "md-save" : "ios-save"}
          onPress={() => navData.route.params.saveLocation()}
        />
      </HeaderButtons>
    )
});

export default MapScreen;
