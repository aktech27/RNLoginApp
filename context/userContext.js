import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    let temp = await AsyncStorage.getItem("User").then((data) => {
      return data === "null" ? null : data;
    });
    setUser(temp);
  };

  useEffect(() => {
    getUser();
  }, []);
  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
