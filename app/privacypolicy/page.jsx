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
            mt: { xs: 15, md: 4 }
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Typography variant='h5' sx={{ mb: 2, fontWeight: 'bold' }}>
                    Privacy Policy
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'justify' }}>
                <Typography variant='body1'>
                    When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address. We use this information only to proceed your order.
                    To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
                </Typography>
            </Box>
        </Box>
    )
}

export default page
