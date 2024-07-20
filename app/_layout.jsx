import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext"
import { useEffect } from "react";



const MainLayout=()=>{

    const router=useRouter()

    const {isAuthenticated}=useAuth();
    const segments=useSegments()

    useEffect(()=>{
        if(typeof isAuthenticated=="undefined") return;

        const inApp=segments[0]=='(app)'

        if(isAuthenticated && !inApp) {
            //go to home
            router.replace('Home')
        }else if(isAuthenticated==false){
            //go to sign in
            router.replace('SignIn')

        }


    },[isAuthenticated])


    return <Slot/>
}


export default function RootLayout() {
    return(
        <AuthContextProvider>
            <MainLayout/>
        </AuthContextProvider>
    )
    
}