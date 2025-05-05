import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomActions from "./CustomActions";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db, storage }) => {
  const { color, name, userID } = route.params; // Extract userID and name from route.params
  const [messages, setMessages] = useState([]);

  // Fetch messages from Firestore when the component mounts
  useEffect(() => {
    navigation.setOptions({ title: name });

    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text || "",
          createdAt: data.createdAt.toDate(),
          user: data.user,
          image: data.image || undefined,
          location: data.location || undefined,
        };
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [db, navigation, name]);

  // Save new messages to Firestore
  const onSend = async (newMessages) => {
    const message = newMessages[0];
    try {
      await addDoc(collection(db, "messages"), {
        text: message.text || "",
        createdAt: new Date(),
        user: {
          _id: userID, // Use the dynamic userID
          name: name, // Use the dynamic name
        },
        image: message.image || null,
        location: message.location || null,
      });
    } catch (error) {
      console.error("Error saving message to Firestore:", error);
    }
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={styles.mapView}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          />
        </MapView>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color || "#FFF" }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID, // Use the dynamic userID
          name: name, // Use the dynamic name
        }}
        renderActions={(props) => (
          <CustomActions {...props} storage={storage} onSend={onSend} />
        )}
        renderCustomView={renderCustomView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default Chat;
