import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Chat from "./Chat";
import connection from "../App.js";
import messages from "./Chat";
import sendmessage from "./Chat";
import closeconnection from "../App.js";
import users  from "./Chat";

const Lobby = ({ JoinRoom }) => {
  const [User, setUser] = useState();
  const [Room, setRoom] = useState();
  <Form
    className="Lobby"
    onSubmit={(e) => {
      e.preventDefault();
      JoinRoom(User, Room);
    }}>
    <Form.Group>
      <Form.Control
        placeholder="Name"
        onChange={(e) => setUser(e.target.value)}
      />
      <Form.Control
        placeholder="Room"
        onChange={(e) => setRoom(e.target.value)}
      />
    </Form.Group>
    <Button variant="success" type="sumbit" disabled={!User || !Room}>
      Join
    </Button>
  </Form>;

  return (
    <div className="app">
      {!connection ? (
        <Lobby JoinRoom={JoinRoom} />
      ) : (
        <Chat
          messages={messages}
          sendmessage={sendmessage}
          closeconnection={closeconnection}
          users={users}
        />
      )}
    </div>
  );
};

export default Lobby;
