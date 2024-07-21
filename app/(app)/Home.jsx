import { View, Text, Button, Pressable, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import ChatList from '../../components/ChatList'
import Loading from '../../components/Loading'
import { getDocs, query, where } from 'firebase/firestore'
import { usersRef } from '../../Utilis/FirebaseConfig'

const Home = () => {

  const {user}=useAuth()
  const [users,setUsers]=useState([])

  useEffect(()=>{
    if(user?.uid)
    getUsers()
  },[])

  const getUsers=async()=>{
    const q=query(usersRef, where('userId','!=',user?.uid ))

    const querySnapShot=await getDocs(q)
    let data=[]

    querySnapShot.forEach((doc)=>{
      data.push({...doc.data()})
    })

    setUsers(data)

  }

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <StatusBar style="light"/>
      {
        users.length>0?(
        <ChatList users={users}/>
      ):(
          <View style={{display:'flex', alignItems:"center",marginTop:100}}>
            <Loading size={100}/>
          </View>
        )
      }
    </View>
  )
}

export default Home