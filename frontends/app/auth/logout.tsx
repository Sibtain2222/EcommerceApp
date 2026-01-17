import { StyleSheet, Text, View  } from 'react-native'
import React, { useState , useEffect } from 'react'
import axios from 'axios'
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { TouchableOpacity,  } from "react-native";
import { router } from "expo-router";
import Loader from '@/components/Loader';

const logout = () => {
    const [loading, setloading]=useState(false)
    const auth= useContext(AuthContext)!
    useEffect(()=>{
      const handlelogout = async( )=>{
    
        setloading(true)
        
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('refreshToken')
        

        auth.setIsLoggedIn(false);
        // Optional: redirect to login page
        setTimeout(()=>{
            router.replace("/auth/Login");
        } ,300);
      }
    handlelogout();

    }, []);
    if (loading) return <Loader />;


}


export default logout
