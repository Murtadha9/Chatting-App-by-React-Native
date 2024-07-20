import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboard from "../components/CustomKeyboard";
import { useAuth } from "../context/authContext";



const SignIn = () => {

  const {login}=useAuth()
    
  const router = useRouter();
  const [loading,setLoading]=useState(false)

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill in all fields");
      return;
    }

    setLoading(true)
    const response=await login(
      emailRef.current,
      passwordRef.current,
    )

    setLoading(false);

    console.log('result' , response)
    if(!response.success) {
      Alert.alert('Sign In', response.msg)
      return;
    }
  };

  return (
    <CustomKeyboard>
      <View style={{ paddingTop: 30, alignItems: "center" }}>
        <Image
          source={require("./../assets/images/signin.png")}
          style={{ width: 300, height: 300, objectFit: "contain" }}
        />
      </View>

      <View style={{ padding: 20, margin: 20 }}>

        <Text style={{fontSize:30,fontWeight:'bold', textAlign:'center'}}>Sign In</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems:'center',
            height: 50,
            padding: 5,
            backgroundColor: "lightgray",
            borderRadius: 15,
            marginTop:20,
            paddingLeft:20
            
          }}
        >
          <Ionicons name="mail-unread" size={24} color="black" />
          <TextInput
          onChangeText={value=>emailRef.current=value}
            placeholder="Email"
            style={{ flex: 1, paddingLeft: 10 }}
          />
        </View>

        <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems:'center',
            height: 50,
            padding: 5,
            backgroundColor: "lightgray",
            borderRadius: 15,
            marginTop:20,
            paddingLeft:20
            
          }}
        >
          <Ionicons name="document-lock" size={24} color="black" />
          <TextInput
          onChangeText={value=>passwordRef.current=value}
            placeholder="Password"
            secureTextEntry
            style={{ flex: 1, paddingLeft: 10 }}
          />
        </View>


        <Text style={{alignSelf:"flex-end", marginTop:5, fontWeight:'bold'}}>Forget Password?</Text>
        </View>

         {loading? (
            <View style={{alignItems:"center"}}>
                <Loading size={90}/>
            </View>
         ):(
             <TouchableOpacity onPress={handleLogin} style={{backgroundColor:'cyan' , padding:10,borderRadius:15,alignItems:'center', marginTop:20}}>
             <Text style={{fontWeight:'bold', fontSize:20}}>Sign In</Text>
           </TouchableOpacity>
         )}

          <View style={{display:'flex', flexDirection:'row',justifyContent:'center', alignItems:'center' ,marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:"semibold"}}>Don't have an account ? </Text>
            <TouchableOpacity onPress={()=>router.push('SignUp')}><Text style={{fontSize:16,fontWeight:'bold',color:'cyan'}}>Sign Up</Text></TouchableOpacity>
          </View>

      </View>
    </CustomKeyboard>
  );
};

export default SignIn;
