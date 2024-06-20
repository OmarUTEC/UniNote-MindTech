import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    // Cargar los mensajes del almacenamiento local al cargar el componente
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      text: newMessage,
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setNewMessage("");

    // Ajustar la altura del textarea después de enviar el mensaje
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evitar el salto de línea
      handleSendMessage();
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);

    // Ajustar la altura del textarea al contenido
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="w-80 fixed right-0 top-0 h-screen flex flex-col bg-indigo-300 dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 shadow-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className="mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow"
            style={{ wordWrap: "break-word", color: "black" }} // Estilo para el color del texto
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex flex-col">
        <textarea
          ref={textAreaRef}
          value={newMessage}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="1"
          style={{ overflow: "hidden", maxWidth: "100%", color: "black" }} // Estilo para el color del texto
        />
        <div className="flex mt-2 space-x-2">
          <button
            onClick={handleSendMessage}
            className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Enviar
          </button>
          <button
            onClick={handleReset}
            className="flex-1 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
