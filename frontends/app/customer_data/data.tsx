import { Alert, StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

/* ================= TYPES ================= */

type CartItem = {
  product_id: number;
  quantity: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
};

/* ================= COMPONENT ================= */

const Data = () => {
  /* -------- params -------- */
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    price: string;
  }>();

  const selectedProduct: Product = {
    id: Number(params.id),
    title: params.title ?? "",
    price: Number(params.price),
  };

  /* -------- customer state -------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);

  /* -------- cart state -------- */
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product_id: selectedProduct.id, quantity: 1 },
  ]);

  /* ================= FUNCTIONS ================= */

  const updateCard = (product_id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product_id === product_id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const create_customer = async () => {
    const response = await fetch(
      "http://192.168.100.196:8000/Ecommerce/Customer_data/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone ? Number(phone) : null,
          address,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Customer creation failed");
    }

    setCustomerId(data.id);
    return data.id;
  };

  const submitOrder = async () => {
    try {
      let cid = customerId;

      if (!cid) {
        cid = await create_customer();
      }

      const response = await fetch(
        "http://192.168.100.196:8000/Ecommerce/create-order/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: cid,
            address,
            items: cartItems,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data?.error || "Order failed");
      } else {
        Alert.alert("Success", "Order placed successfully");
      }

      console.log("ORDER RESPONSE:", data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />

      <View style={{ marginVertical: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {selectedProduct.title}
        </Text>

        <Text>Price: ${selectedProduct.price}</Text>

        <TextInput
          placeholder="Quantity"
          keyboardType="number-pad"
          value={String(cartItems[0].quantity)}
          onChangeText={q =>
            updateCard(selectedProduct.id, Number(q) || 1)
          }
          style={{
            borderWidth: 1,
            width: 80,
            marginTop: 8,
            padding: 6,
          }}
        />
      </View>

      <Button title="Place Order" onPress={submitOrder} />
    </View>
  );
};

export default Data;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
