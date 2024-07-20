import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const Home = () => {

  const {logout, user}=useAuth()

  const handleLogout=async()=>{
    await logout()

  }

  console.log(user)
  return (
    <View>
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default Home