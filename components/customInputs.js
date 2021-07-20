import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export const NameInput = ({ setName }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder={"Enter Full Name"}
        onChangeText={(text) => {
          setName(text);
        }}
      />
    </View>
  );
};
export const EmailInput = ({ setEmail }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder={"Enter Email"}
        keyboardType={"email-address"}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
    </View>
  );
};
export const PasswordInput = ({ setPassword }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder={"Enter Password"}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    width: "80%",
    margin: 10,
  },
  input: { height: 60, borderWidth: 1, paddingHorizontal: 10, fontSize: 20 },
  text: {
    fontSize: 18,
    marginLeft: 5,
  },
});
