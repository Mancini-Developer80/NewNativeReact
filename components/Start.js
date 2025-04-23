import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0075A2"); // Default color

  return (
    <ImageBackground
      source={require("../assets/background.png")} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Type your username here"
        />
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={[styles.choice, { backgroundColor: "#0075A2" }]}
            onPress={() => setColor("#0075A2")}
          />
          <TouchableOpacity
            style={[styles.choice, { backgroundColor: "#481620" }]}
            onPress={() => setColor("#481620")}
          />
          <TouchableOpacity
            style={[styles.choice, { backgroundColor: "#D55672" }]}
            onPress={() => setColor("#D55672")}
          />
        </View>
        {/* This button navigates to the Chat screen and passes the name and
         color as parameters */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat", { name, color })}
          style={styles.button}
        >
          <Text>Go to Chat</Text>
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
