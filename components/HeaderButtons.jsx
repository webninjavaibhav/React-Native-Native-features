import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { isAndroid } from "../common/plateformChecker";
import { Ionicons } from "@expo/vector-icons";
import Color from "../constants/Colors";

/**
 * Create custom header button for header
 * @param {object} props
 */
const customHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={24}
      color={isAndroid() ? Color.secondary : Color.primary}
    />
  );
};

export default customHeaderButton;
