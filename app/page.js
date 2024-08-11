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
        backgroundImage: `url('/img/background.jpeg')`,  // Corrected path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Fallback color with higher transparency
        backgroundBlendMode: 'darken',  // Blend the background image with the dark overlay
        color: 'white',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: 4,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h2" gutterBottom fontWeight="bold">
          Welcome to NetworkNinja
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Your personal assistant to help you connect with others and grow your network.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/chat')}
          sx={{ padding: '10px 20px', fontSize: '18px' }}
        >
          Start Networking
        </Button>
      </Box>
    </Box>
  );
}
