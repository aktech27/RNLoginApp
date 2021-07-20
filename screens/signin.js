import React, { useState, useContext } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EmailInput, PasswordInput } from "../components/customInputs";
import { UserContext } from "../context/userContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />
      <Button
        title="Log In"
        onPress={() => {
          console.log(`Email: ${email} Password: ${password}`);
          axios
            .post("http://10.0.2.2:3003/login", { email, password })
            .then(async (response) => {
              console.log(response.data.user.name);
              Alert.alert("Success", response.data.message);
              await AsyncStorage.setItem("User", JSON.stringify(response.data.user));
              AsyncStorage.getItem("User").then((data) => {
                setUser(data);
              });
            })
            .catch((err) => {
              console.log(err.response.data.error);
              Alert.alert("Error", err.response.data.error);
            });
        }}
      />
      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navLinks: {
    marginVertical: 20,
    paddingVertical: 10,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
});
