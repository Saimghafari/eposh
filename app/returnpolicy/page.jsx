'use client';
import React from 'react'
import { Box, Typography, Stack, Divider } from '@mui/material';

function page() {
    return (
        <Box
            sx={{
                
                maxWidth: { xs: '100%', sm: '700px', md: '800px', lg: '900px' },
                margin: 'auto',
                p: { xs: 2, sm: 3, md: 4 }, 
                backgroundColor: 'white', 
                textAlign: 'justify',
                mt: { xs: 15, md: 4 }
            }}
        >
            {/* Header: Exchange And Refund Policies */}
            <Typography
                variant="body1" 
                color="text.secondary" 
                textAlign="center"
                sx={{ mb: 2,fontWeight: 'bold' }}
            >
                Exchange And Refund Policies
            </Typography>

            {/* Main Title: Exchange is easy as Shopping with EPOSH */}
            <Typography
                variant="h5" 
                textAlign="center"
                sx={{ mb: 4, fontWeight: 'bold' }} // Adjust fontWeight as needed
            >
                Exchange is easy as Shopping with EPOSH
            </Typography>

            {/* Introductory Paragraphs */}
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                We at EPOSH.PK want to be sure that our customers are always happy and satisfied. No matter what, we choose to bring comfort to your lives. We are constantly looking for more ways to introduce something unique to cater to the increasing needs of our valued customers. We strive to provide each and every order with perfection, every detail meeting the client's preferences and delivered on time. However, despite of this, there are still times the customers are not happy.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
                We have a perfect replace and exchange policy to address this issue. If you have chosen to go for a replacement, we can help you! However, there are certain conditions you can be considered to get a replacement. Some of them include:
            </Typography>

            {/* Bulleted List for Conditions */}
            <Stack component="ul" sx={{ listStyleType: 'disc', pl: 3, mb: 4 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                    You did not get a product matching your order, product is not as a picture or as described, due to our mistake.
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                    In case of fabric, shrinkage, colour fade or in case of damage product delivered due to our mistake.
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6, fontWeight: 'bold' }}>
                    Note: Change of mind is not applicable to the exchange policy.
                </Typography>
            </Stack>

            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
                Here are some more facilities for replacement/exchange of products offered by EPOSH.PK.
            </Typography>

            <Divider sx={{ my: 4 }} /> {/* Divider for separation */}

            {/* Section: Return Within 7 Days */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Return Within 7 Days
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    If you have identified the defect or wrong product, it is recommended to hurry up! There is a total duration of seven days after delivery to inform us about the replacement/exchange.
                </Typography>
            </Box>

            {/* Section: Send Back Your Order */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Send Back Your Order
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    You can return the order and let us know via email to <span style={{fontWeight: 'bold'}}> ahtixham786@gmail.com</span> describing your order ID. Make sure you send the courier within 07 days of delivery.
                </Typography>
            </Box>

            {/* Section: Return Charges */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Return Charges
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    The courier to return the product is going to be paid by the customer.
                </Typography>
            </Box>

            {/* Section: What you should take care of before return */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    What you should take care of before return
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    Before you return the items, make sure they are undamaged and not used at all. Merchandise that has been worn, used, or altered will not be accepted for exchange.
                </Typography>
            </Box>

            {/* Section: Product Original Packaging */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    Send the product with original product packaging, warranty cards, documentation, manufacturer's containers, manuals and everything you received with the order. Make sure nothing is marked or defaced in the list of items provided.
                </Typography>
            </Box>

            {/* Section: Return / Refund */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Return / Refund
                </Typography>
                <Stack component="ul" sx={{ listStyleType: 'disc', pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                        Customer needs to return the goods via traceable delivery i.e. courier or registered part on his own expense to our address.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                        Delivery Charges are not refundable.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                        Refund requests will be processed within 7-15 working days after we receive the returned products.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                        Refund would be paid to the address written on our Cash on Delivery slip.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                        We have a QA team to test your ordered products are functioning correctly before they are packed and sent to you.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6, fontWeight: 'bold' }}>
                        Attention: we can't accept the exchange or cancelling after your order has been shipped.
                    </Typography>
                </Stack>
            </Box>

            <Divider sx={{ my: 4 }} /> {/* Divider for separation */}

            {/* Note on Slight Difference in shades */}
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                Please note slightly difference in shades is not a defect. Similarly, minor stitching issues in may occur even after rigorous quality checks. This may happen during the undergoing packing process & will not be considered as a defect.
                The following information is required when you reflect the problem:
            </Typography>
            <Stack component="ul" sx={{ listStyleType: 'disc', pl: 3, mb: 4 }}>
                <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    --Order number
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    --Image/video of defective beads.
                </Typography>
            </Stack>

            {/* Contact Information */}
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                If you have any question regarding return policy, please feel free to contact us!!
                 <span style={{fontWeight: 'bold'}}> ahtixham786@gmail.com</span>
            </Typography>
        </Box>
    )
}

export default page
