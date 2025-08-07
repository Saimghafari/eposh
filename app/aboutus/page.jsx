'use client';
import React from 'react'
import { Box, Typography } from '@mui/material';

function page() {
    return (
        <Box sx={{

            maxWidth: { xs: '100%', sm: '700px', md: '800px', lg: '900px' },
            margin: 'auto',
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: 'white',
            mt: { xs: 15, md: 4 },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Typography variant='h5' sx={{ mb: 2, fontWeight: 'bold' }}>
                    About US!
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'justify' }}>
                <Typography variant='body1'>
                    Welcome to the World of EPOSH. We have been serving customers in this industry for 8 years. The online sales expansion allowed us to begin serving customers world-wide. We prioritize giving top of the line service and high quality products to customers. EPOSH offers a large selection for your bedroom, bath, and any other room in your home. Almost every one of our products is stitched in the finest thread of Egyptian cotton, giving you quality and comfort above and beyond our competition. Our products are reduced 50% or more from large retailers to bring you unbeatable prices so you can rest assured that you will not hurt your wallet. So Shop with Confidence & Trust as we are EPOSH. <br/>
                    <span style={{fontWeight: 'bold'}}>Contact No: ahtixham786@gmail.com</span>
                </Typography>
            </Box>
        </Box>
    )
}

export default page
