"use client";
import React, { useState } from 'react';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardActionArea,
    Paper
} from '@mui/material';
import Image from 'next/image';
import { useSearch } from './Context/SearchContext';

const cardData = [
    {
        title: "Velvet Curtains",
        image: "/image2.jpg",
        description: [
            'Luxury Duvet Sets', 'Silk Duvet Sets', 'Embroidered Duvet Sets',
            'Cross Pleated Duvet Sets', 'Pintucks Duvet Sets', 'Embellish Duvet Sets',
            'Rainbow Stripe Duvet Sets', 'Oxford Duvet Sets',
            'Horizontal Stripe Duvet Sets', 'All Duvet Sets'
        ]
    },
    {
        title: "Best Bedding",
        image: "/image3.jpg",
        description: "Comfortable and elegant bedding sets."
    },
    {
        title: "Cushions",
        image: "/image4.jpg",
        description: "Decorative cushions to style your space."
    },
];

function HeroCards() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { searchData } = useSearch();

    if (searchData) return <Typography variant='h4' >Searching for "{searchData}"</Typography>;

    return (
        <Box>
            <Box>
                <Box
                    sx={{
                        mt: { xs: 12, md: 2 } 
                    }}
                >
                    <Image
                        src="/image7.jpg"
                        alt="Hero"
                        width={1200}
                        height={500}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>
            </Box>

            <Box sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 4,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '100%',
                        mx: 'auto',
                    }}
                >
                    {cardData.map((item, index) => (
                        <Card
                            key={index}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            sx={{
                                width: 360,
                                height: 360,
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: 3,
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <CardActionArea disableRipple sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />

                                {/* Title visible when not hovering */}
                                {hoverIndex !== index && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 15,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '90%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                            py: 1,
                                            textAlign: 'center',
                                            borderRadius: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1rem',
                                                color: '#000',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Box>
                                )}


                                {hoverIndex === index && (
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            backgroundColor: 'rgba(255,255,255,0.97)',
                                            px: 2,
                                            py: 2,
                                            borderRadius: 2,
                                            textAlign: 'center',
                                            width: '90%',
                                            height: '90%',
                                            overflowY: 'auto',

                                            // Hide scrollbar but allow scrolling
                                            scrollbarWidth: 'none',
                                            '&::-webkit-scrollbar': {
                                                display: 'none',
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ mb: 1 }}
                                        >
                                            {item.title}
                                        </Typography>

                                        {Array.isArray(item.description) ? (
                                            <Box
                                                component="ul"
                                                sx={{
                                                    listStyle: 'none',
                                                    p: 0,
                                                    m: 0,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {item.description.map((descItem, i) => (
                                                    <Typography
                                                        key={i}
                                                        component="li"
                                                        variant="body2"
                                                        sx={{
                                                            mb: 0.6,
                                                            fontSize: '0.9rem',
                                                            color: '#555',
                                                        }}
                                                    >
                                                        {descItem}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                sx={{ fontSize: '0.95rem', color: '#555' }}
                                            >
                                                {item.description}
                                            </Typography>
                                        )}
                                    </Paper>
                                )}
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default HeroCards;