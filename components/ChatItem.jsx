import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { blurhash } from "../Utilis/common";

export default function ChatItem({ item, noBorder, router }) {

    const openChatRoom=()=>{
        router.push({pathname:'./chatRoom', params:item})
    }

    
  return (
    <TouchableOpacity
    onPress={openChatRoom}
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          marginHorizontal: 5,
          marginBottom: 5,
          paddingBottom: 3,
        },
        noBorder ? {} : { borderBottomWidth: 1, borderColor: "lightgray" },
      ]}
    >
      <Image
        source={item?.profileUrl}
        style={{ height: 80, width: 80, borderRadius: 99 }}
        placeholder={blurhash}
        transition={500}
      />

      {/*name and last maesage*/}
      <View style={{ flex: 1, gap: 2 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 18 }}>{item?.username}</Text>
          <Text style={{ fontWeight: "400", fontSize: 14 }}>Time</Text>
        </View>
        <Text>last message</Text>
      </View>
    </TouchableOpacity>
  );
}
