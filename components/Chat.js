import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomActions from "./CustomActions";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation, storage }) => {
  const { color, name } = route.params;
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Welcome to the chat!",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "System",
      },
    },
  ]);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  const onSend = (newMessages) => {
    const formattedMessages = newMessages.map((message) => ({
      _id: message._id || new Date().getTime(),
      text: message.text || "",
      createdAt: message.createdAt || new Date(),
      user: message.user || { _id: 1, name: "User" },
      image: message.image || undefined,
      location: message.location || undefined,
    }));

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, formattedMessages)
    );
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
          _id: 1,
          name: "User",
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
