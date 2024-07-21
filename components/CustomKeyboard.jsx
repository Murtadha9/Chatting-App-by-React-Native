import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";

const ios = Platform.OS === "ios";

const CustomKeyboard = ({ children ,inChat}) => {

  let kavCongig={}
  let ScrollViewConfig={}

  if(inChat) {
    kavCongig={keyboardVerticalOffset:90}
    ScrollViewConfig={contentContainerStyle:{flex:1}}

  }


  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kavCongig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...ScrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboard;
