import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, color, userID } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected) {
      // Fetch messages from Firestore
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
        const messagesList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to Date
            user: data.user,
          };
        });

        setMessages(messagesList); // Update the messages state

        // Cache messages in AsyncStorage
        try {
          await AsyncStorage.setItem("messages", JSON.stringify(messagesList));
        } catch (error) {
          console.error("Failed to save messages to local storage:", error);
        }
      });

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    } else {
      // Load cached messages from AsyncStorage
      const loadCachedMessages = async () => {
        try {
          const cachedMessages = await AsyncStorage.getItem("messages");
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          } else {
            Alert.alert("No internet connection", "No cached messages found.");
          }
        } catch (error) {
          console.error("Failed to load messages from local storage:", error);
        }
      };

      loadCachedMessages();
    }
  }, [db, name, navigation, isConnected]);

  const onSend = (newMessages) => {
    if (isConnected) {
      // Save the new message to Firestore
      addDoc(collection(db, "messages"), newMessages[0]);
    } else {
      Alert.alert("You are offline", "Messages cannot be sent while offline.");
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (!isConnected) {
      return null; // Hide the InputToolbar when offline
    }
    return <InputToolbar {...props} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: color || "#FFF" }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} // Conditionally render the InputToolbar
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID, // Use the userID from route.params
          name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
