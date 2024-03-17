import { SetStateAction, useState, useEffect } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "other";
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("messages");
      if (savedMessages !== null) {
        return JSON.parse(savedMessages);
      }
    }
    return [
      { text: "Hello!", sender: "user" },
      { text: "Hi there!", sender: "other" },
    ];
  });
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]); // Run whenever tasks change

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      // Send from user
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");

      // Get message from api
      try {
        const response = await axios.get("https://api.adviceslip.com/advice");
        const advice = response.data.slip.advice;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: advice, sender: "other" },
        ]);
      } catch (error) {
        console.error("Error fetching advice:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div
        className="flex-1"
        style={{
          maxHeight: "calc(100vh - 3rem - 4rem)",
          overflowY: "scroll",
          padding: "1rem 0",
        }}
      >
        <div className="p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.sender === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className="chat-bubble"
                data-testid={`label-message-${index}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 fixed bottom-0 left-0 right-0 bg-white flex justify-center">
        <div className="flex items-center w-full max-w-lg join">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered w-full join-item"
            value={newMessage}
            onChange={handleInputChange}
            data-testid="input-new-message"
          />
          <button
            onClick={sendMessage}
            className="btn btn-primary join-item"
            data-testid="button-send-message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
