import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { router, Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import Loader from '@/components/Loader';


import { Label } from '@react-navigation/elements';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const auth = useContext(AuthContext)!;

    
    const handleLogin = async () => {
        const userdata={
          username, 
          password,
        }
        try{
            setLoading(true)
            const response= await axios.post('http://192.168.100.196:8000/Ecommerce/token/', userdata )
            await SecureStore.setItemAsync('accessToken', response.data.access);
            await SecureStore.setItemAsync('refreshToken', response.data.refresh);
            auth.setIsLoggedIn(true);
           
            console.log("login successful")
            setSuccess(true)
             setTimeout(() => {
      router.replace("/");
    }, 300);
            
          
            // if (!response.ok){
            //   throw new Error ("login failed")
            // }
        }catch(error){
            console.error(error)
            setSuccess(false)
        }finally{
          setLoading(false)
        

        
    }
    
  }
  if (loading) {return <Loader />};
    return (
    <>
     <Stack.Screen options={{ headerShown: false }} />
     <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don,t have an account? <Text style={styles.link} onPress={()=>router.push('/auth/Register')}>Register</Text>
      </Text>
    </View>
    </>
    )
  }


export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
    color: '#2e7d32',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  link: {
    color: '#2e7d32',
    fontWeight: '600',
  },
});
