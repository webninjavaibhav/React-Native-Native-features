/**
 * File system used to store data im file system
 * For more info visit: https://docs.expo.io/versions/v36.0.0/sdk/filesystem/
 */

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button
} from "react-native";
import { addPlaceAction } from "../store/actions/placeAction";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { style } from "../common/styles";
import Colors from "../constants/Colors";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import * as FileSystem from "expo-file-system";

const NewPlace = props => {
  /**
   * Handle title state
   */
  const [place, setPlace] = useState("");

  /**
   * Get route from naviagtion
   */
  const route = useRoute();

  /**
   * PickedLOcation from map
   */
  const pickedLocation = route && route.params && route.params.pickedLocation;

  /**
   * Handle selected image state
   */
  const [selectedImage, setSelectedImage] = useState();

  /**
   * Action dispatcher
   */
  const dispatch = useDispatch();

  /**
   * Add place ( dispatch addPlace action)
   */
  const savePlaceHandler = async () => {
    const fileName = selectedImage.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: selectedImage,
        to: newPath
      });
      dispatch(addPlaceAction(place, newPath, pickedLocation));
      setPlace("");
      props.navigation.goBack();
    } catch (err) {
      console.log(error);
    }
  };

  /**
   * Image handler
   * @param {string} imageUri
   */
  const imageHandler = imageUri => {
    setSelectedImage(imageUri);
  };

  return (
    <ScrollView style={newPlaceStyle.newPlaceContainer}>
      <View style={newPlaceStyle.form}>
        <Text>Add Place name:</Text>
        <TextInput
          value={place}
          onChangeText={text => setPlace(text)}
          style={style.inputStyle}
        />
        <ImagePicker onImageTaken={imageHandler} />
        <LocationPicker
          pickedLocation={pickedLocation}
          navigation={props.navigation}
        />
        <Button
          title="Save"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

/**
 * Export navigationOptions from here and import in navigation file to use it
 * But in new react navigation v5 we have to export like one function
 * in options props of stack we have to pass this function above link show how we can set options
 * @param {object} navData
 */
export const newPlaceOptions = () => ({
  title: "Add Place"
});

const newPlaceStyle = StyleSheet.create({
  ...style,
  form: {
    margin: 30
  }
});

export default NewPlace;
