import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ storage, onSend }) => {
  const pickImage = async () => {
    try {
      console.log("Requesting media library permissions...");
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "You need to allow access to your media library to pick an image."
        );
        return;
      }

      console.log("Launching image picker...");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use MediaTypeOptions.Images
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log("Image selected:", result.assets[0].uri);
        const imageUri = result.assets[0].uri;
        uploadImage(imageUri);
      } else {
        console.log("Image picker canceled.");
      }
    } catch (error) {
      console.error("Error in pickImage:", error);
      Alert.alert("Error", "An error occurred while selecting an image.");
    }
  };

  const uploadImage = async (uri) => {
    try {
      console.log("Uploading image...");
      console.log("Image URI:", uri); // Log the URI to verify it

      // Fetch the file and convert it to a Blob
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Failed to fetch the image file.");
      }
      const blob = await response.blob();

      // Generate a unique reference for the image
      const uniqueRef = `images/${Date.now()}`;
      const storageRef = ref(storage, uniqueRef);

      // Upload the Blob to Firebase Storage
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Image uploaded successfully:", downloadURL);
      onSend([{ text: "", image: downloadURL }]);
    } catch (error) {
      console.error(
        "Failed to upload image:",
        error.message,
        error.code,
        error.serverResponse
      );
      Alert.alert("Error", `Failed to upload image: ${error.message}`);
    }
  };

  const getLocation = async () => {
    try {
      console.log("Requesting location permissions...");
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to allow location access to share your location."
        );
        return;
      }

      console.log("Fetching location...");
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { latitude, longitude } = location.coords;
        console.log("Location retrieved:", { latitude, longitude });
        onSend([{ text: "", location: { latitude, longitude } }]);
      }
    } catch (error) {
      console.error("Failed to retrieve location:", error);
      Alert.alert("Error", "Failed to retrieve location. Please try again.");
    }
  };

  const onActionPress = () => {
    console.log("Action sheet opened.");
    Alert.alert(
      "Choose an action",
      "",
      [
        {
          text: "Select an image",
          onPress: () => {
            console.log("Select an image option pressed.");
            pickImage();
          },
        },
        {
          text: "Share location",
          onPress: () => {
            console.log("Share location option pressed.");
            getLocation();
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Opens a menu to select an image or share your location"
    >
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
