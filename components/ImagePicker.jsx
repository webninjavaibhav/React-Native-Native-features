/**
 * Example is how you can handle image picker with expoe app in react native
 * For more information visit: https://docs.expo.io/versions/v36.0.0/sdk/imagepicker/
 */

import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as Imagepicker from "expo-image-picker";
import * as Permission from "expo-permissions";

const ImgPicker = props => {
  /**
   * Taken image uri state
   */
  const [imageUri, setImageUri] = useState("");

  /**
   * Ask Camera permission
   */
  const verifyPermission = async () => {
    const result = await Permission.askAsync(
      Permission.CAMERA_ROLL,
      Permission.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Please grant camera aceess for further action",
        {
          text: "Okay"
        }
      );
      return false;
    }
    return true;
  };

  /**
   * Handle image picker
   */
  const imagePickerHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await Imagepicker.launchCameraAsync({
      aspect: [16, 9],
      quality: 0.5,
      allowsEditing: true
    });
    setImageUri(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={imagePickerStyle.imagePicker}>
      <View style={imagePickerStyle.imagePrivew}>
        {!imageUri ? (
          <Text>No Image picked yet.</Text>
        ) : (
          <Image
            style={imagePickerStyle.imagePrivew}
            source={{ uri: imageUri }}
          />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={imagePickerHandler}
      />
    </View>
  );
};

const imagePickerStyle = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginVertical: 10
  },
  imagePrivew: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default ImgPicker;
