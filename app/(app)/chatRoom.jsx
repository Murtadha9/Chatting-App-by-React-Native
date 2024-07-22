import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import { FontAwesome } from "@expo/vector-icons";
import CustomKeyboard from "../../components/CustomKeyboard";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../Utilis/common";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Utilis/FirebaseConfig";

const chatRoom = () => {
  const item = useLocalSearchParams(); //second user
  const { user } = useAuth(); //current user (logged in user)
  const router = useRouter();

  const [messages, setMessages] = useState([]);

  const textRef=useRef('')
  const inputRef=useRef(null)
  const scrollViewRef=useRef(null)

  useEffect(() => {
    createRoomIfDoesNotExist();

    let roomId = getRoomId(user?.userId , item?.userId);
    const docRef=doc(db,'rooms',roomId)
    const messageRef=collection(docRef, 'messages')

    const q=query(messageRef,orderBy('createdAt','asc'))

    let unsub=onSnapshot(q , (snapshot)=>{
        let allMessages=snapshot.docs.map(doc=>{
          return doc.data();
        });
        setMessages([...allMessages]);
    })


    const keyBoardDidShowListenser=Keyboard.addListener(
      'keyboardDidShow',updateScrollView
    )
    return()=>{
      unsub()
      keyBoardDidShowListenser.remove();

    }


  }, []);


  useEffect(()=>{
    updateScrollView()
  },[messages])

  const updateScrollView=()=>{
    setTimeout(()=>{
      scrollViewRef?.current?.scrollToEnd({animated:true})
    },100)
    
  }

  const createRoomIfDoesNotExist = async() => {
    let roomId = getRoomId(user?.userId , item?.userId);
    await setDoc(doc(db,'rooms',roomId),{
      roomId,
      createdAt:Timestamp.fromDate(new Date()),

    });
  };

  const handleSendMessage=async()=>{

    let message=textRef.current.trim();
    if(!message) return;

    try {
      let roomId = getRoomId(user?.userId , item?.userId);
      const docRef=doc(db,'rooms',roomId)
      const messageRef=collection(docRef, 'messages')
      textRef.current=''
      if(inputRef) inputRef?.current?.clear()

      const newDoc=await addDoc(messageRef,{
        userId:user?.userId,
        text:message,
        profileUrl:user?.profileUrl,
        senderName:user?.username,
        createdAt:Timestamp.fromDate(new Date()),
      })
      
    } catch (err) {
      Alert.alert('Message', err.message)
      
    }
  }

  return (
    <CustomKeyboard inChat={true}>
      <View style={{ display: "flex", flex: 1,backgroundColor:'#F3F4F3' }}>
        <StatusBar style="dark" />
        <ChatRoomHeader secondUser={item} router={router} />

        <View>
          <View style={{ display: "flex", height: "100%" }}>
            {/*MessageList*/}
            <View style={{ flex: 1 }}>
              <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
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
                    paddingLeft: 10,
                  }}
                >
                  <TextInput
                  onChangeText={value=>textRef.current = value}
                  ref={inputRef}
                    style={{ flex: 1 }}
                    placeholder="type here .........."
                  />
                  <TouchableOpacity
                  onPress={handleSendMessage}
                    style={{
                      backgroundColor: "#667BC6",
                      padding: 10,
                      margin: 5,
                      borderRadius: 99,
                    }}
                  >
                    <FontAwesome name="send" size={24} color="white" />
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
