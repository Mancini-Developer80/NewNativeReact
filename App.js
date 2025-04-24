import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { StyleSheet, Text, View } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBLGnmOHGUtnFSHyIOb5yQwItNJkiMRWd0",
    authDomain: "shopping-list-demo-5ef3a.firebaseapp.com",
    projectId: "shopping-list-demo-5ef3a",
    storageBucket: "shopping-list-demo-5ef3a.firebasestorage.app",
    messagingSenderId: "338378377371",
    appId: "1:338378377371:web:093927c42c713ca9201e3e",
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const styles = StyleSheet.create({});

export default App;
