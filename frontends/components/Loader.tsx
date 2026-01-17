import { StyleSheet, Text,  } from 'react-native'

import React from "react";
import { View  , ActivityIndicator} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Loader = () => {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <ActivityIndicator size="large" color="#1e88e5" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})