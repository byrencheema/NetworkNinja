'use client'
import { useState, useEffect, useRef } from "react";
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm **NetworkNinja**, a chatbot that helps you grow your network. How can I assist you today?`
    }
  ]);
  const [message, setMessage] = useState("");

  // Create a ref for the message container
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message container when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessages = [...messages, { role: "user", content: message }, { role: "assistant", content: "" }];
      setMessages(newMessages);
      setMessage("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([...messages, { role: "user", content: message }])
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }

        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
        });

        return reader.read().then(processText);
      });
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url('/img/background.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 3,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Stack
        direction="column"
        width="100%"
        maxWidth="600px"
        height="80vh"
        bgcolor="rgba(255, 255, 255, 0.85)"
        border="1px solid #ddd"
        borderRadius="12px"
        overflow="hidden"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
      >
        <Box bgcolor="#865CA6" color="white" padding={2} textAlign="center">
          <Typography variant="h5" fontWeight="bold">NetworkNinja</Typography>
          <Typography variant="body2">Your networking assistant</Typography>
        </Box>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            overflowY: 'auto',
            flexGrow: 1,
            padding: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
              width="100%"
            >
              <Box
                sx={{
                  bgcolor: message.role === "assistant" ? (index % 2 === 0 ? "#865CA6" : "#754e9c") : "#220C10",
                  color: 'white',
                  padding: 2,
                  borderRadius: "12px",
                  maxWidth: "75%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
              </Box>
            </Box>
          ))}
          {/* Add an invisible element to serve as the scrolling target */}
          <div ref={messagesEndRef} />
        </Stack>

        <Stack direction="row" spacing={2} padding={2} alignItems="center" bgcolor="#F5F5F5">
          <TextField
            label="Type your message"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ height: '56px', minWidth: '120px', backgroundColor: '#865CA6', '&:hover': { backgroundColor: '#754e9c' } }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
