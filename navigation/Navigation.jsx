import "react-native-gesture-handler";
import * as React from "react";
import { isAndroid } from "../common/plateformChecker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceList, { placeListOptions } from "../screens/PlaceList";
import PlaceDetails, { placeDetailsOptions } from "../screens/PlaceDetails";
import NewPlace, { newPlaceOptions } from "../screens/NewPlace";
import MapScreen, { mapMyOptions } from "../screens/MapScreen";
import Color from "../constants/Colors";

/**
 * Create stack navigator in React navigation v5
 * https://reactnavigation.org/docs/hello-react-navigation#creating-a-stack-navigator
 */
const Stack = createStackNavigator();

/**
 *  set Defualt navigation option for all screens
 */
const defualtNavigationOption = {
  /** set hedaer style */

  headerStyle: {
    /** set header background color */

    backgroundColor: isAndroid() ? Color.primary : ""
  },
  /** set header text color */

  headerTintColor: isAndroid() ? Color.secondary : Color.primary
};

/**
 * Root navigation container
 * screenOption is props where you can set your all screen defualt option
 * options set for single screen
 */
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defualtNavigationOption}>
        <Stack.Screen
          name="placeList"
          component={PlaceList}
          options={placeListOptions}
        />
        <Stack.Screen
          name="mapScreen"
          component={MapScreen}
          options={mapMyOptions}
        />
        <Stack.Screen
          name="placeDetails"
          component={PlaceDetails}
          options={placeDetailsOptions}
        />
        <Stack.Screen
          name="newPlace"
          component={NewPlace}
          options={newPlaceOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
