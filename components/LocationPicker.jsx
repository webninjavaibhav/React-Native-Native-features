/**
 * expo-location use to get user current position in expo app of react native
 * for more information visit: https://docs.expo.io/versions/v36.0.0/sdk/location/
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permission from "expo-permissions";
import MapView from "./MapView";

const LocationPicker = props => {
  /**
   * Handle location state
   */
  const [location, setLocation] = useState();

  /**
   * Handle location fetching state
   */
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (props.pickedLocation) {
      setLocation(props.pickedLocation);
    }
  }, [props.pickedLocation]);

  /**
   * Ask Location permission
   */
  const verifyPermission = async () => {
    const result = await Permission.askAsync(Permission.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Location Permission",
        "Please grant location aceess for further action",
        {
          text: "Okay"
        }
      );
      return false;
    }
    return true;
  };

  /**
   * Handle user location
   */
  const handleUserLocation = async () => {
    setIsFetching(true);
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    try {
      const locationPromise = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setLocation({
        lat: locationPromise.coords.latitude,
        lng: locationPromise.coords.longitude
      });
    } catch (err) {
      Alert.alert("Coudn't fetch location", "Please try again later!", {
        text: "Okay"
      });
      console.log(err);
    }
    setIsFetching(false);
  };

  /**
   * Pick on map handler
   */
  const pickOnMap = () => {
    props.navigation.navigate("mapScreen");
  };

  return (
    <View style={locationPickerStyle.locationPicker}>
      <View style={locationPickerStyle.locationPriview}>
        <MapView onPress={pickOnMap} location={location}>
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No Location choosen yet!.</Text>
          )}
        </MapView>
      </View>
      <View>
        <Button
          color={Colors.primary}
          title="Get User Location "
          onPress={handleUserLocation}
        />
        <Button
          color={Colors.primary}
          title="Picke from map "
          onPress={pickOnMap}
        />
      </View>
    </View>
  );
};

const locationPickerStyle = StyleSheet.create({
  locationPicker: {
    alignItems: "center",
    marginVertical: 15
  },
  locationPriview: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1
  }
});

export default LocationPicker;
