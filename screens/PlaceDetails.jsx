import React from "react";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

const PlaceDetails = props => {
  /**
   * Get route from naviagtion
   */
  const route = useRoute();

  /**
   * Current selected place
   */
  const place = route && route.params && route.params.place;

  /**
   * Open show map
   */
  const showMapHandler = () => {
    props.navigation.navigate("mapScreen", {
      readOnly: true,
      initialLocation: {
        lat: place.lat,
        lng: place.lng
      }
    });
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={showMapHandler}>
        <Image
          style={{ width: "100%", height: 200 }}
          source={{ uri: place.image }}
        />
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
          <Text>{place.lat}</Text>
          <Text>{place.lng}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

/**
 * Export navigationOptions from here and import in navigation file to use it
 * But in new react navigation v5 we have to export like one function
 * Now onwards getParam method removed from navigation.
 * Now onwards you can get params data inside route.params.
 * https://reactnavigation.org/docs/params/
 * in options props of stack we have to pass this function above link show how we can set options.
 * @param {object} navData
 */
export const placeDetailsOptions = navData => ({
  headerTitle: navData.route.params.placeTitle
});

export default PlaceDetails;
