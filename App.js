import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Firebase and NetInfo
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCntEO-AqLuNJiLS-yNcDy8StyDdSMQ3Ko",
  authDomain: "chat-ddaad.firebaseapp.com",
  projectId: "chat-ddaad",
  storageBucket: "chat-ddaad.firebasestorage.app",
  messagingSenderId: "429939474253",
  appId: "1:429939474253:web:ebdedd52853ef2df9fc104",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const netInfo = useNetInfo(); // Monitor network status

  // Enable or disable Firestore based on network connectivity
  useEffect(() => {
    if (netInfo.isConnected === false) {
      disableNetwork(db)
        .then(() => console.log("Firestore network disabled"))
        .catch((error) =>
          console.error("Error disabling Firestore network:", error)
        );
    } else if (netInfo.isConnected === true) {
      enableNetwork(db)
        .then(() => console.log("Firestore network enabled"))
        .catch((error) =>
          console.error("Error enabling Firestore network:", error)
        );
    }
  }, [netInfo.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          children={(props) => (
            <Chat {...props} db={db} isConnected={netInfo.isConnected} />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
