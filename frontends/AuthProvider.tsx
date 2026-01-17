
import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import { createContext , useState, useEffect  , ReactNode ,} from 'react'
import * as SecureStore from 'expo-secure-store'
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext= createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({children}: AuthProviderProps) => {
    const [isLoggedIn , setIsLoggedIn]= useState(false)
    const [loading, setLoading]=useState(true)
    useEffect(()=>{
        const loadtoken= async ()=>{
            const token= await SecureStore.getItemAsync('accessToken')
            setIsLoggedIn(!!token)
            setLoading(false)
        } 
        loadtoken()
    },[])
     if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1e88e5" />
      </View>
    );
  } // 
 
    return (
        <AuthContext.Provider value={{isLoggedIn , setIsLoggedIn }}>
            {children}

        </AuthContext.Provider>
    )
}


export { AuthContext  ,  AuthProvider}


