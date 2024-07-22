import { View, Text } from "react-native";
import React from "react";
import { formatTime } from "../Utilis/common";

const MessageItem = ({ message, currentUser }) => {

    const renderTime=()=>{
        if(message){
            let date=message?.createdAt
          return formatTime(new Date(date?.seconds * 1000))
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
              backgroundColor: "gray",
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
            backgroundColor: "pink",
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
