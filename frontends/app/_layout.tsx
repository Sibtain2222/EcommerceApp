import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import './globals.css'
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { AuthProvider } from "../AuthProvider";


export default function RootLayout() {
  useEffect(() => {
    // Hide bottom navigation bar (Android)
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  return  (
    <>
    <AuthProvider>
  <StatusBar hidden={true} style="auto" />
  <Stack /> 
  </AuthProvider>
  </> );

}
