import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Another = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>This is Another</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default Another;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
