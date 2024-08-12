'use client'
import { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Slide } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  // Trigger the slide animation on component mount
  useEffect(() => {
    setChecked(true);
  }, []);

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
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 3,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Dark background for better integration
          padding: 5,
          borderRadius: '16px',
          boxShadow: '0 6px 30px rgba(0, 0, 0, 0.3)',
          maxWidth: '700px',
          marginBottom: '40px',
        }}
      >
        <Image
          src="/img/sword.png"
          alt="Ninja Mascot"
          width={120}
          height={120}
          priority
          style={{ marginBottom: '20px' }}
        />
        <Typography variant="h3" gutterBottom fontWeight="bold" color="#858AE3">
          Welcome to NetworkNinja
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3, color: '#FFFFFF' }}>
          Your personal assistant to help you connect with others and grow your network.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#858AE3',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#754e9c',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            },
          }}
          onClick={() => router.push('/chat')}
        >
          Start Networking
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={3} justifyContent="center">
        {[
          { img: "/img/fog.png", title: "Stealth Mode", desc: "Keep your conversations private and secure." },
          { img: "/img/scythe.png", title: "Sharp Tools", desc: "Use cutting-edge features to enhance your networking." },
          { img: "/img/stars.png", title: "Quick Connect", desc: "Instantly connect with like-minded professionals." },
          { img: "/img/sword.png", title: "Cut Through Noise", desc: "Filter out distractions and focus on what matters." }
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Slide direction="up" in={checked} timeout={1500}>
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Dark background similar to the hero section
                  padding: '20px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  width={70}
                  height={70}
                  priority
                />
                <Typography variant="h6" color="#858AE3" sx={{ marginTop: 2, fontSize: '18px' }}>{feature.title}</Typography>
                <Typography variant="body2" color="#FFFFFF">{feature.desc}</Typography>
              </Box>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
