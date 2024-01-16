import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    padding: 5,
    marginVertical: 15
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    color: Colors.secondary
  }
});
