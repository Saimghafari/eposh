'use client';
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Link from 'next/link';

function Footer() {

  const items = [{ label: 'Search', path: '/search' },
  { label: 'About Us!', path: '/aboutus' },
  { label: 'Exchange And Refund Policy', path: '/returnpolicy' },
  { label: 'Privacy Policy', path: '/privacypolicy' }
  ]
  return (
    <Box>
      <Box
        sx={{
          mt: 5,
          px: { xs: 2, md: 12 },
          py: 5,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'space-between' },
          alignItems: { xs: 'center', md: 'flex-start' },
          backgroundColor: '#fff',
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        {/* Left Column */}
        <Box sx={{ minWidth: '200px', mb: { xs: 3, md: 0 } }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: 'uppercase',
              lineHeight: '20px',
            }}
          >
            IMPORTANT <br />
            INFORMATION
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {items.map((item, i) => (
              <Typography
                key={i}
                sx={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                <Link href={item.path} style={{textDecoration: 'none', color: 'black'}}>
                  {item.label}
                </Link>
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right Column */}
        <Box sx={{ maxWidth: 600, width: '100%' }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            SIGN UP FOR OUR NEWSLETTER
          </Typography>
          <Typography sx={{ fontSize: '14px', mt: 0.5, mb: 2 }}>
            Subscribe us for latest offers.
          </Typography>

          {/* Email input and Subscribe button */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              alignItems: 'center',
              mb: 3,
              justifyContent: { xs: 'center', sm: 'start' }
            }}
          >
            <TextField
              placeholder="Enter Your Email Address"
              variant="outlined"
              size="small"
              sx={{
                flex: 1,
                backgroundColor: '#fff',
                input: { fontSize: '14px' },
                width: { xs: '100%', sm: 'auto' }
              }}
            />
            <Button
              variant="outlined"
              sx={{
                px: 4,
                height: '37px',
                fontSize: '12px',
                border: '1px solid black',
                color: 'black',
                fontWeight: 500,
                letterSpacing: 0.5,
                ':hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              SUBSCRIBE!
            </Button>
          </Box>

          {/* Social icons */}
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            FOLLOW US
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{ marginLeft: { xs: 0, md: -1 } }}
          >
            <IconButton><FacebookIcon fontSize="small" /></IconButton>
            <IconButton><GoogleIcon fontSize="small" /></IconButton>
            <IconButton><InstagramIcon fontSize="small" /></IconButton>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mx: { xs: 2, md: 6 } }}>
        <Divider
          variant="middle"
          sx={{
            borderBottomWidth: '2px',
            mt: 2,
            mb: '5px',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
          gap: 1,
          mt: 4,
          px: { xs: 2, md: 12 },
          mb: 4,
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Box sx={{ mb: { xs: 1, md: 0 } }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            EPOSH
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'cursive',
              fontStyle: 'italic',
              fontSize: '0.75rem',
            }}
          >
            in your style
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'center' },
            width: '100%',
            px: 2,
            py: 1,
            gap: { xs: 1, md: 0 },
          }}
        >
          <Typography variant="body2" sx={{ ml: { xs: 0, md: 5 } }}>
            EPOSH © 2020 All Rights Reserved.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailRoundedIcon fontSize="small" />
            <Typography variant="body2">ahtixham786@gmail.com</Typography>
          </Box>
        </Box>


      </Box>
    </Box>
  );
}

export default Footer;