import { View, Text, Platform } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../Utilis/common";
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MeniItem } from "./CustomMenueitems";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ios = Platform.ios == "ios";

const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  const { user,logout } = useAuth();

  const handleProfile = () => {};

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{
        paddingTop: ios ? top : top + 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#EF5A6F",
        paddingBottom: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Chats</Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ width: 50, height: 50, borderRadius: 99 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{
            optionsContainer:{
                borderRadius:15,
                borderCurve:'continuous',
                marginTop:40,
                marginLeft:-30,
                backgroundColor:'#536493',
                shadowOpacity:0.5,
                shadowOffset:{width:0,height:0},
                width:160
            }
          }}>
            <MeniItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Ionicons name="person" size={24} color="white" />}
            />
            <View style={{width:'100%', backgroundColor:'gray', padding:0.5 }}/>
            <MeniItem
              text="SignOut"
              action={handleLogout}
              value={null}
              icon={<MaterialCommunityIcons name="logout" size={24} color="white" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;
