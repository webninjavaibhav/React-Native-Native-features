import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const MapPreview = props => {
  let locationPriview;
  if (props.location) {
    locationPriview = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}%2c%20${props.location.lng}&zoom=12&size=400x150&key=YOUR_KEY`;
  }
  return (
    <TouchableOpacity onPress={props.onPress}>
      {locationPriview ? (
        <Image
          style={mapPriviewStyle.mapImg}
          source={{ uri: locationPriview }}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const mapPriviewStyle = StyleSheet.create({
  mapImg: {
    width: "100%",
    height: 150
  }
});

export default MapPreview;
