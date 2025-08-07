"use client";
import React from 'react';
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import Image from 'next/image';

function Discover() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexWrap: 'wrap',
                gap: 2,
                px: 2, // padding on x-axis for small screens
            }}
        >
            {/* Card 1 */}
            <Box
                sx={{
                    width: { xs: '100%', md: '45%' },
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <Image
                    src="/image5.jpg"
                    alt="Hero"
                    width={500}
                    height={500}
                    style={{ width: '90%', height: 'auto', marginTop: 8 }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'black',
                        padding: { xs: 1, sm: 2 },
                        zIndex: 10,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: '90%',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                        gutterBottom
                    >
                        NEW ARRIVALS
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ fontSize: { xs: '20px', sm: '28px', md: '34px' }, fontWeight: 'bold' }}
                        gutterBottom
                    >
                        TOUCH OF COLOR
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' }, mb: 2 }}
                        gutterBottom
                    >
                        Essential styles come alive in bright colors.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: 'black',
                            fontSize: { xs: '12px', sm: '14px' },
                            px: { xs: 2, sm: 3 },
                            py: { xs: 0.5, sm: 1 },
                            ':hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    >
                        Discover More
                    </Button>
                </Box>
            </Box>

            {/* Card 2 */}
            <Box
                sx={{
                    width: { xs: '100%', md: '45%' },
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <Image
                    src="/image6.jpg"
                    alt="Hero"
                    width={500}
                    height={500}
                    style={{ width: '90%', height: 'auto', marginTop: 8 }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'black',
                        padding: { xs: 1, sm: 2 },
                        zIndex: 10,
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: '90%',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontSize: { xs: '14px', sm: '16px' } }}
                        gutterBottom
                    >
                        DISCOVER THEM ALL
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: '20px', sm: '28px', md: '34px' },
                            fontWeight: 'bold',
                        }}
                        gutterBottom
                    >
                        THIS SEASON'S
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: '20px', sm: '28px', md: '34px' },
                            fontWeight: 'bold',
                            mb: 2,
                        }}
                        gutterBottom
                    >
                        BOMBER DUVETS
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: 'black',
                            fontSize: { xs: '12px', sm: '14px' },
                            px: { xs: 2, sm: 3 },
                            py: { xs: 0.5, sm: 1 },
                            ':hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    >
                        Discover More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Discover;