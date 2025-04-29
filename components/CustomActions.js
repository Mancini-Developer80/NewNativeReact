import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ storage, onSend }) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your media library to pick an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      uploadImage(imageUri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uniqueRef = `images/${Date.now()}`;
      const storageRef = ref(storage, uniqueRef);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      onSend([{ text: "", image: downloadURL }]);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to allow location access to share your location."
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { latitude, longitude } = location.coords;
      onSend([{ text: "", location: { latitude, longitude } }]);
    }
  };

  const onActionPress = () => {
    Alert.alert(
      "Choose an action",
      "",
      [
        { text: "Select an image", onPress: pickImage },
        { text: "Share location", onPress: getLocation },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={styles.wrapper}>
        <Text style={styles.iconText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomActions;
