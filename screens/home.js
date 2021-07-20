import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text>Welcome {user}</Text>
      <Button
        title="Another"
        onPress={() => {
          navigation.navigate("Another");
        }}
      />
      <Button
        title="Log out"
        onPress={() => {
          setUser(null);
          AsyncStorage.clear();
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
