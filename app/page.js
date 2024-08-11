'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm **NetworkNinja**, a chatbot that helps you connect with others. How can I assist you today?`
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
    setMessage("");
    setMessages([...messages, { role: "user", content: message }, { role: "assistant", content: "" }]);
    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([...messages, { role: "user", content: message }])
    }).then(async (response) => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
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
    });
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="100%"
        maxWidth="600px"
        height="80vh"
        border="1px solid gray"
        borderRadius="8px"
        overflow="hidden"
        bgcolor="background.paper"
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            overflowY: 'auto',
            flexGrow: 1,
            p: 2,
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
                bgcolor={message.role === "assistant" ? "primary.main" : "secondary.main"}
                color='white'
                p={2.3}
                borderRadius="16px"
                maxWidth="70%"
              >
                <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
              </Box>
            </Box>
          ))}
          {/* Add an invisible element to serve as the scrolling target */}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2} p={2} alignItems="center">
          <TextField
            label="Message"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            sx={{ height: '56px' }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
