import { useState } from "react";
import "./App.css";
import ".//bootstrap/dist/css/bootstrap.min.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Lobby from "./Components/Lobby";
import Chat from "./Components/Chat";
import MessageContainer from "./Components/MessageContainer";

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState();
  const [users, setusers] = useState([]);

  const JoinRoom = async (User, Room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44331/chatHubs")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UserInRoom", (users) => {
        setusers(users);
      });

      connection.on("RecieveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setusers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { User, Room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const closeconnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const sendmessage = async (message) => {
    try {
      await connection.invoke("sendmessage", message);
    } catch (e) {
      console.log(e);
    }
  };
};

export default App;
