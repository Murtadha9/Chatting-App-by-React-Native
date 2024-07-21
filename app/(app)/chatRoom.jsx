import { View, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import { FontAwesome } from '@expo/vector-icons';
import CustomKeyboard from "../../components/CustomKeyboard";

const chatRoom = () => {
  const item = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState();

  return (
    <CustomKeyboard inChat={true}>
      <View style={{ display: "flex", flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />

      <View>
        <View style={{ display: "flex", height: "100%" }}>
          {/*MessageList*/}
          <View style={{ flex: 1 }}>
            <MessageList messages={messages} />
          </View>
          {/*MessageList*/}

          {/*inputs*/}
          <View style={{ marginBottom: 20, paddingTop: 10 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "gray",
                  padding: 5,
                  borderRadius: 99,
                  paddingLeft:10
                }}
              >
                <TextInput style={{ flex: 1 }} placeholder="type here .........." />
                <TouchableOpacity style={{backgroundColor:'gray', padding:10,margin:5,borderRadius:99}}>
                    <FontAwesome name="send" size={24} color="black" />
                </TouchableOpacity>

              </View>
            </View>
          </View>
          {/*inputs*/}
        </View>
      </View>
    </View>
    </CustomKeyboard>
    
  );
};

export default chatRoom;
