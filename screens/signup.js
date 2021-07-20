import React, { useState } from "react";
import { StyleSheet, View, Button, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NameInput, EmailInput, PasswordInput } from "../components/customInputs";
import axios from "axios";

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <NameInput setName={setName} />
        <EmailInput setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />
        <PasswordInput setPassword={setConfirmPassword} />
        <Button
          title="Register"
          onPress={() => {
            console.log(`Name: ${name} Email: ${email} Passwords: ${password} ${confirmPassword}`);
            axios
              .post("http://10.0.2.2:3003/register", { name, email, password })
              .then((response) => {
                console.log(response.data.message);
                Alert.alert("Success", response.data.message, [
                  { text: "OK", onPress: () => navigation.navigate("Signin") },
                ]);
              })
              .catch((err) => {
                console.log(err.response.data.error);
                Alert.alert("Error", err.response.data.error);
              });
          }}
        />
        <Button
          title="Signin"
          onPress={() => {
            navigation.navigate("Signin");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
