import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomActions from "./CustomActions";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ storage, onSend }) => {
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
    <GiftedChat
      messages={[]}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
      renderActions={(props) => (
        <CustomActions {...props} storage={storage} onSend={onSend} />
      )}
      renderCustomView={renderCustomView} // Render custom MapView for location messages
    />
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default Chat;
