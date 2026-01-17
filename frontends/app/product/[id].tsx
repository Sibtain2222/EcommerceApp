import { View, Text, Image,ScrollView, TouchableOpacity } from "react-native";
import { useRouter  , router, usePathname} from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Button  ,} from "@react-navigation/elements";
import { useState , useEffect, useContext } from "react";
import { Alert } from "react-native";


import { AuthContext } from "@/AuthProvider";


export default function ProductCard({  }) {
 
  const router = useRouter();
  const {id , title , images , price , description ,category , rating_rate , rating_count }= useLocalSearchParams<{
    id: string;
    title: string;
    images: string;
    price: string;
    description: string;
    category: string;
    rating_rate:string;
    rating_count:string;
   }>();
  const auth = useContext(AuthContext);
      if (!auth) {
        throw new Error("AuthContext must be used inside AuthProvider");
      }
      const { isLoggedIn, setIsLoggedIn } = auth;
  const handleLogin = () => {
  if (!isLoggedIn) {
    Alert.alert("Please login", "You need to login to perform this action");
    router.replace("/");
    return false; // optional, if you want to prevent further action
  }
  return true; // user is logged in
};


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
    <View>
        <ScrollView contentContainerStyle={{paddingBottom:80}}>
      <Image className="ml-20 mt-10" source={{ uri:images}}
       style={{ width: 200, height: 300 }}
  resizeMode="contain"/>
  <View   className="w-120 h-20 m-4 space-y bg-dark-100 rounded-3xl">
        <Text style={{ fontSize: 17 , textAlign:"center" , fontWeight:"bold"}} >{title}</Text>
  </View>
    <View  className="ml-2 space-y-2  rounded-3xl p-4">
        <Text style={{ fontWeight:"bold" , fontSize:20}}>Price :{price} $</Text></View>
    <View className="ml-6 "><Text style={{fontWeight:"bold", fontSize: 16 }}>About us:</Text></View>
        <Text style={{fontWeight:'500' ,fontStyle:'italic'}} className="ml-6">{description}</Text>
     <View className="ml-6 py-4 "><Text style={{fontWeight:"bold", fontSize: 16 }}>Category:</Text>
        <Text style={{fontWeight:'500' ,fontStyle:'italic'}} className="mt-1 ">{category}</Text>
      </View>
      <View className="ml-6 py-2.5 "><Text style={{fontWeight:"bold", fontSize: 16 }}>rating</Text>
     
      </View>

      <View>

        <TouchableOpacity
  onPress={() =>{
            console.log("Buy pressed" )
            router.push({
              pathname:"../customer_data/data",
              params:{
                id:id,
                title:title,
                price:price,},
  });
}}
          
  style={{
    backgroundColor: "#1E90FF",   // button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  }}
>
  <TouchableOpacity onPress={() => {
    if (!handleLogin()) return;
    }}
    >
  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
    Buy Now 🛒
  </Text>
  <Text style={{ color: "#fff", fontSize: 16, marginTop: 4 , fontWeight: "bold"  }}>
    Price  {price}$
  </Text>
  </TouchableOpacity>
</TouchableOpacity>
        
   
      </View>
      </ScrollView>
    
    

    </View>
    
  
      </>
  );
}

