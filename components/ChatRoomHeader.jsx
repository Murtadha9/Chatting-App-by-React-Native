import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";

import { blurhash } from "../Utilis/common";
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';

const ChatRoomHeader = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={user?.profileUrl}
                style={{ height: 80, width: 80, borderRadius: 99 }}
                
              />
              <Text style={{fontSize:20, fontWeight:'bold'}}>{user?.username}</Text>
            </View>
          </View>
        ),

        headerRight:()=>(
            <View  style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}>
                <Ionicons name="call" size={28} color="red" />
                <Ionicons name="videocam" size={28} color="orange" />
              </View>
        )
      }}
    />
  );
};

export default ChatRoomHeader;
