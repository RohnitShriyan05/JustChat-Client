import "./App.css";
import { useState } from "react";
import React from "react";
import HomePg from "./Components/HomePg/HomePg";
import LoginPg from "./Components/LoginPg/LoginPg";
import Div100vh from 'react-div-100vh';

export const userContext = React.createContext(null);
function App() {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(0);
  const [currentChannelId, setCurrentChannelId] = useState("");
  const [currentChannel, setCurrentChannel] = useState("Select a channel");
  const [sidebarToggle, setSidebarToggle] = useState(true);
  return (
    <Div100vh className="App bg-chatbg">
      <userContext.Provider value={{sidebarToggle, setSidebarToggle, user, setUser, login, setLogin, currentChannelId, setCurrentChannelId, currentChannel, setCurrentChannel }}>
        {login === 1 ? <HomePg /> : <LoginPg />}
      </userContext.Provider>
    </Div100vh>
  );
}

export default App;
