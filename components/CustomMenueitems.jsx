import { Text, View } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export const MeniItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal:10,
          paddingVertical:5
        }}
      >
        <Text style={{fontWeight:'bold', color:'white'}}>{text}</Text>
        <Text>{icon}</Text>
      </View>
    </MenuOption>
  );
};
