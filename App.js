import React, { useContext } from "react";
import UserContextProvider, { UserContext } from "./context/userContext";
import AuthNavigator from "./routes/authStack";
import MainNavigator from "./routes/mainStack";

const Routing = () => {
  const { user } = useContext(UserContext);
  return user ? <MainNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <UserContextProvider>
      <Routing />
    </UserContextProvider>
  );
}
