import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { useState } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <Form
      onsubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}>
      <InputGroup>
        <FormControl
          placeholder="message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <InputGroup.Append>
          <Button variant="primary" type="submit" disabled={!message}>
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
