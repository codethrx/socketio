import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [room, setRoom] = useState("");
  useEffect(() => {
    socket.on("GET", (data) => setText(data));
  }, [socket]);
  const sendMessage = () => {
    socket.emit("SEND", { message, room });
  };
  const joinRoom = () => {
    socket.emit("JOIN", room);
  };
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {text}
    </div>
  );
}

export default App;
