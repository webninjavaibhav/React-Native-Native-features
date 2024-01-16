import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButtons";
import { isAndroid } from "../common/plateformChecker";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlacesAction } from "../store/actions/placeAction";
import PlaceItem from "../components/placeItem";

const PlaceList = props => {
  /**
   * Placelist
   */
  const placeList = useSelector(state => state.placeReducer.placeList);

  /**
   * Action dispatcher
   */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlacesAction());
  }, []);

  return (
    <FlatList
      data={placeList}
      keyExtractor={place => place.id.toString()}
      renderItem={place => (
        <PlaceItem
          {...place.item}
          onSelect={() =>
            props.navigation.navigate("placeDetails", {
              place: place.item
            })
          }
        />
      )}
    />
  );
};

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
export const placeListOptions = navData => ({
  title: "All Places",
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add Place"
        iconName={isAndroid() ? "md-add" : "ios-add"}
        onPress={() => navData.navigation.navigate("newPlace")}
      />
    </HeaderButtons>
  )
});

export default PlaceList;
