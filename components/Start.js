import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0075A2"); // Default color
  const colors = ["#0075A2", "#481620", "#D55672"];

  const signInUser = () => {
    signInAnonymously(auth)
      .then((res) => {
        navigation.navigate("Chat", {
          userID: res.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully");
      })
      .catch((err) => {
        Alert.alert("Unable to sign in, try later again");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>welcome to my Application!</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Type your username here"
        />
        <View style={styles.choicesContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.choice, { backgroundColor: color }]}
              onPress={() => setColor(color)}
            />
          ))}
        </View>
        {/* This button navigates to the Chat screen and passes the name and
         color as parameters */}
        <TouchableOpacity
          onPress={() => {
            if (name == "") {
              Alert.alert("You need a username");
            } else {
              signInUser();
            }
          }}
          style={styles.button}
        >
          <Text>Start chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#fff",
    color: "#fff",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    width: "88%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "88%",
    marginTop: 20,
  },
  choice: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Start;
