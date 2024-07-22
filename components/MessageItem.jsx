import { View, Text } from "react-native";
import React from "react";
import { formatTime } from "../Utilis/common";

const MessageItem = ({ message, currentUser }) => {

    const renderTime = () => {
        if (message?.createdAt?.seconds) {
            let date = new Date(message.createdAt.seconds * 1000);
            return formatTime(date);
        } else {
            return ''; // Return an empty string if message or createdAt is not defined
        }
    }


  if (currentUser?.userId === message?.userId) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
          marginRight: 10,
        }}
      >
        <View style={{ width: "80%" }}>
        
          <View
            style={{
              display: "flex",
              flexDirection:'row',
              alignSelf: "flex-end",
              padding: 10,
              borderRadius: 20,
              backgroundColor: "#FFB4C2",
              justifyContent:'space-between',
              alignItems:'center',
              gap:20
            }}
          >
            <Text style={{fontSize:10}}>{renderTime()}</Text>
            
            <Text style={{ fontSize: 15 }}>{message?.text}</Text>
            
          </View>
        </View>
        
      </View>
    );
  } else {
    return (
      <View style={{ width: "80%", marginBottom: 10, marginLeft: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection:'row',
            alignSelf: "flex-start",
            padding: 10,
            paddingHorizontal: 10,
            backgroundColor: "#FDFFD2",
            borderRadius: 20,
            alignItems:'center',
            gap:20
          }}
        >
            <Text style={{fontSize:10}}>{renderTime()}</Text>
          <Text style={{ fontSize: 15 }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
