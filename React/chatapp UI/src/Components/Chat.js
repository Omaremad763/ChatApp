import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

import { Button } from "bootstrap";
const Chat = ({ messages, sendMessage, closeconnection, users }) => (
  <div>
    <div className="leave-room">
      <Button variant="danger" onClick={() => closeconnection()}>
        leave Room
      </Button>
    </div>
    <ConnectedUsers users={users} />
    <div className="Chat">
      <MessageContainer messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
    </div>
    <div className="App">
      <MessageContainer messages={messages} />
    </div>
  </div>
);

export default Chat;
