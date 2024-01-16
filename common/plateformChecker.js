import { Platform } from "react-native";

/**
 * Check device type is android
 */
export const isAndroid = () => {
  return Platform.OS === "android";
};
