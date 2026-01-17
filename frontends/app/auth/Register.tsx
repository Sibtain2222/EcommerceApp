import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import  {useState} from 'react'
import { Button , Label } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import { router, Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Loader from '@/components/Loader';

const Register = () => {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [email , setEmail] = useState('');
    const [sucess, setsucess] = useState(false);
    const [loading , setloading] = useState(false);
    const navigation = useNavigation();

    const handleRegister= async()=>{
      setloading(true); 
     
        try {
            setloading(true)
            const response = await fetch('http://192.168.100.196:8000/Ecommerce/register/', {
               method:'POST',
               headers:{
                'Content-Type': 'application/json'},
                body:JSON.stringify({
                  username:username,
                  password:password,
                  email:email,
                })
              });
               
            
            
            const data= await response.json();
            console.log(data);
            setsucess(true)
            router.push('./Login');


            if (!response.ok){
              throw new Error ("registration failed ")

            }
          
        }catch(error){
            console.error(error);
            setsucess(false)
        }finally{
            setloading(false);
        
    }
    
  }
  if (loading) return <Loader />;

    return (
      <>
       <Stack.Screen options={{ headerShown: false }} />
       <View className='mb-40' style={styles.container}>
      
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {sucess && <Text style={styles.success}>Registration Successful 🎉</Text>}
    </View>
    </>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2e7d32',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  success: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
});
