import { Text, View } from "react-native";
import { useState , useEffect, useContext } from "react";
import sales from "../assets/images/sales.png";
import { Stack } from "expo-router";
import { useRouter , router} from "expo-router";
import { Image } from "react-native";
import axiosInstance from '../axiosInstance' ;
import {  Button, FlatList, } from "react-native";
import {  TouchableOpacity, } from 'react-native';
import Register from "./auth/Register";
import { Link } from "expo-router";
import { AuthContext } from "../AuthProvider";




type Product = {

  id: number;
  title: string;
  price: number;
  // images: string;
  description:string;
  category:string;
  // rating:{
  //   rate:number;
  //   count:number;}
  images: string;

};



export default function Index() {
 
  const [currentTime, setCurrentTime] = useState(new Date());
  const [products, setProducts] = useState<Product[]>([]);
 
  const handle_login=()=>{
    try{
      (!isLoggedIn)
      alert.call("plz login")
    }finally{
      
    }
  }
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)!
  const auth = useContext(AuthContext);
    if (!auth) {
      throw new Error("AuthContext must be used inside AuthProvider");
    }
    const { isLoggedIn, setIsLoggedIn } = auth;

  const handleBackend= async()=>{
      

      try{
        const response=await axiosInstance.get('/Ecommerce/data');
        setProducts(response.data);
        // console.log("Backend Response:",response.data);

      }catch(error){
      console.error("Error fetching data from backend:",error);
    }
    };



    useEffect(() => {
        handleBackend();
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); 
        // Clear interval on component unmount
    },  []);
  
  return (
   

    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View className='bg-secondary-500 h-[200px] rounded-b-1xl  '>
      <View style={{ flexDirection: "row"  ,  alignItems: "center" , gap: 38 }}>
        <View className='ml-10'>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {currentTime.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' , hour12: false  , })}
            </Text>
        </View>
       <View className='bg-dark-800 w-40 h-10   mt-2 rounded-2xl '></View>
        <Text className=''>    📶     🔋</Text>
        </View>
        
   
      <View className='mt-10 ml-10'  style={{ flexDirection:"row" , gap:5}}><Text style={{ fontSize:30 , fontWeight:'bold'}}>mart</Text>
      <Text style={{ fontSize:30 ,fontWeight:'bold' , color:'white'}} >fury</Text>
     
     {!isLoggedIn && (
      
     <View style={styles.authButtonContainer}>
  <TouchableOpacity
    onPress={() => router.push('/auth/Register')}
    style={styles.registerButton}
  >
    <Text style={styles.registerText}>Sign Up</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push('/auth/Login')}
    style={styles.loginButton}
  >
    <Text style={styles.loginText}>Sign In</Text>
  </TouchableOpacity>
</View>
 

  


      )}
      </View> 
     


{isLoggedIn && (
  
  <TouchableOpacity 
  className="ml-80"
    style={styles.logoutButton }
      onPress={() => router.push("/auth/logout")}
  >
    <Text  style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
)}
       

    </View>
   

 
   
    <View className=' items-center justify-center mb-20 '>
     
      <Image style={ {width:380, height:150}}  source={sales} className='mt-1'/>
    </View>
     {isLoggedIn && (
     
    
    <View style={{ flex: 1, padding: 10 ,marginTop:-75 }}>
  
      <FlatList
        data={products}
        
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={{
                gap:20,
                paddingRight:5,
                marginBottom:10,
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
        renderItem={({ item }) => (
          <View style={styles.card } className="w-[50%]"  >
            <TouchableOpacity 
      onPress={() =>
        router.push({
          pathname:"/product/[id]",
          params:{
              id:item.id,
              title:item.title,
              price:item.price,
              images:item.images,
              description:item.description,
              category:item.category,
              // rating_rate:JSON.stringify(item.rating.rate),
              // rating_count:JSON.stringify(item.rating.count),


          },
          })
          }
           >
              
             <Image
              source={{ uri: item.images[0] }}
               style={styles.productImage}
            />

                 </TouchableOpacity>
    
            <Text numberOfLines={2} style={styles.title}  ellipsizeMode="tail" >{item.title}</Text>
            <Text>${item.price}</Text>

        
          </View>
        
        
       
          
        )}
      />

      <TouchableOpacity style={styles.refreshButton} onPress={handleBackend}>
  <Text style={styles.refreshText}>Refresh</Text>
</TouchableOpacity>
    
    </View>
 
    )}
    


  
    
    </>
  );
}


const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "contain",
  },


refreshButton: {
  backgroundColor: "#2e7d32",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 10,
},
refreshText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 16,
},



authButtonContainer: {
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '30%',
  height:105,
  alignSelf: 'center',
  marginBottom: 50,
  gap: 2, // 👈 spacing between buttons (RN 0.71+)
  marginLeft:115,
},

registerButton: {
  flex: 1,
  backgroundColor: '#1e88e5',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  elevation: 3,
},

loginButton: {
  flex: 1,
  backgroundColor: '#FCFBF4',
  borderWidth: 1.5,
  borderColor: '#1e88e5',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
},

registerText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

loginText: {
  color: '#1e88e5',
  fontSize: 16,
  fontWeight: '600',
},



  logoutButton: {
  backgroundColor: "#e53935",
  padding: 14,
  borderRadius: 12,
  alignItems: "center",
  width:100,
  height:50,
},
logoutText: {
  color: "white",
  fontWeight: "600",
  fontSize: 16,
},


});



import { StyleSheet } from "react-native";