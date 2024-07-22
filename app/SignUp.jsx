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

import * as ImagePicker from "expo-image-picker";
import CustomKeyboard from "../components/CustomKeyboard";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const emailRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }

    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );

    setLoading(false);

    console.log('result' , response)
    if(!response.success) {
      Alert.alert('Sign Up', response.msg)
      return;
    }
  };

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your media library to set a profile picture."
      );
      return;
    }

    // Open image picker and allow the user to select an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      profileRef.current = uri;
    }
  };

  return (
    <CustomKeyboard>
      <View style={{ paddingTop: 30, alignItems: "center" }}>
        <Image
          source={require("./../assets/images/signup2.webp")}
          style={{ width: 250, height: 250, objectFit: "contain" }}
        />
      </View>

      <View style={{ padding: 20, margin: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Sign Up
        </Text>

        

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 5,
            backgroundColor: "#F3F4F3",
            borderRadius: 15,
            marginTop: 20,
            paddingLeft: 20,
          }}
        >
          <Ionicons name="person" size={24} color="black" />
          <TextInput
            onChangeText={(value) => (usernameRef.current = value)}
            placeholder="Username"
            style={{ flex: 1, paddingLeft: 10 }}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 5,
            backgroundColor: "#F3F4F3",
            borderRadius: 15,
            marginTop: 20,
            paddingLeft: 20,
          }}
        >
          <Ionicons name="mail-unread" size={24} color="black" />
          <TextInput
            onChangeText={(value) => (emailRef.current = value)}
            placeholder="Email"
            style={{ flex: 1, paddingLeft: 10 }}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 5,
            backgroundColor: "#F3F4F3",
            borderRadius: 15,
            marginTop: 20,
            paddingLeft: 20,
          }}
        >
          <Ionicons name="document-lock" size={24} color="black" />
          <TextInput
            onChangeText={(value) => (passwordRef.current = value)}
            placeholder="Password"
            secureTextEntry
            style={{ flex: 1, paddingLeft: 10 }}
          />
        </View>

        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  objectFit: "contain",
                }}
              />
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                marginTop: 20,
              }}
            >
              <Ionicons name="image" size={50} color="#FF7D5E" />
              <Text style={{ fontWeight: "bold" }}>Pick Image Profile</Text>
            </View>
          )}
        </TouchableOpacity>

        {loading ? (
          <View style={{ alignItems: "center" }}>
            <Loading size={90} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: "#FF7D5E",
              padding: 10,
              borderRadius: 15,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "semibold" }}>
            Aleardy have one ?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("SignIn")}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#FF7D5E" }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomKeyboard>
  );
};

export default SignUp;
