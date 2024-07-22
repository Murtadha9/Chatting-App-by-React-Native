import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { blurhash, formatDate, getRoomId } from "../Utilis/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Utilis/FirebaseConfig";

export default function ChatItem({ item, noBorder, router,currentUser }) {

  const [lastMessage,setLastMessage]=useState(undefined)

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId , item?.userId);
    const docRef=doc(db,'rooms',roomId)
    const messageRef=collection(docRef, 'messages')

    const q=query(messageRef,orderBy('createdAt','desc'));

    let unsub=onSnapshot(q , (snapshot)=>{
        let allMessages=snapshot.docs.map(doc=>{
          return doc.data();
        });
        setLastMessage(allMessages[0]? allMessages[0]:null);
    })

    return unsub;

  }, []);

    const openChatRoom=()=>{
        router.push({pathname:'./chatRoom', params:item})
    }



    const renderTime=()=>{
        if(lastMessage){
          let date=lastMessage?.createdAt
          return formatDate(new Date(date?.seconds * 1000))
        }
    }

    const renderLastMessage=()=>{
      if(typeof lastMessage === 'undefined') return 'Loading.....'
      if(lastMessage){
        if(currentUser?.userId == lastMessage?.userId) return 'You: ' + lastMessage?.text;
        return lastMessage?.text

      }else{
        return 'Say Hi'
      }
      
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
          <Text style={{ fontWeight: "400", fontSize: 14 }}>{renderTime()}</Text>
        </View>
        <Text>{renderLastMessage()}</Text>
      </View>
    </TouchableOpacity>
  );
}
