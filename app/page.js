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
        backgroundImage: `url('/img/background.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fallback color with transparency
        backgroundBlendMode: 'darken',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',  // Slightly transparent white
          padding: 4,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h2" gutterBottom fontWeight="bold" color="#865CA6">
          Welcome to NetworkNinja
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }} color="black">
          Your personal assistant to help you connect with others and grow your network.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#865CA6',
            '&:hover': {
              backgroundColor: '#754e9c',
            },
          }}
          onClick={() => router.push('/chat')}
        >
          Start Networking
        </Button>
      </Box>
    </Box>
  );
}
