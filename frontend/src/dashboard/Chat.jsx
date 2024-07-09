import React, { useState, useEffect, useRef } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue, push } from "firebase/database";
import useTheme from "../theme";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textAreaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { darkMode } = useTheme();

  // Usar useRef para almacenar el ID del usuario
  const userIdRef = useRef(null);

  // Función para obtener o generar un ID de usuario
  const getUserId = () => {
    if (!userIdRef.current) {
      userIdRef.current = 'user_' + Math.random().toString(36).substr(2, 9);
    }
    return userIdRef.current;
  };

  useEffect(() => {
    const messagesRef = ref(db, "messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.keys(messagesData).map((key) => ({
          id: key,
          ...messagesData[key]
        }));
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    push(ref(db, "messages"), {
      text: newMessage,
      timestamp: Date.now(),
      userId: getUserId()
    });

    setNewMessage("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`w-full h-full flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} shadow-lg overflow-hidden`}>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 flex ${message.userId === getUserId() ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
              message.userId === getUserId()
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}>
              <p>{message.text}</p>
              <p className="text-xs text-right mt-1 opacity-70">
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={`p-4 border-t border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} flex items-center`}>
        <textarea
          ref={textAreaRef}
          value={newMessage}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className={`flex-grow p-2 mr-2 border rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          rows="1"
          style={{ overflow: "hidden" }}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;