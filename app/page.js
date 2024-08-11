'use client'
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url('/img/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fallback color with transparency
        backgroundBlendMode: 'darken', // Blend the background image with a dark overlay
        color: 'white',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to NetworkNinja
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: '600px', marginBottom: 3 }}>
        Your personal assistant to help you connect with others and grow your network.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => router.push('/chat')}
        sx={{ marginTop: 3 }}
      >
        Start Networking
      </Button>
    </Box>
  );
}
