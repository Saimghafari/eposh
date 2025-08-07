"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Box,
    IconButton,
    Tooltip,
    Divider,
    Typography,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    TextField,
    InputAdornment,
    patch,
    Badge,
    Menu,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import Image from 'next/image';
import Link from 'next/link';
import DrawerProduct from './DrawerProduct';
import { useSelector } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { useRouter } from 'next/navigation'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { styled } from '@mui/material/styles';
import { useSearch } from './Context/SearchContext';


const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none', // Removes the default border
        },
        '&:hover fieldset': {
            border: 'none', // Removes border on hover
        },
        '&.Mui-focused fieldset': {
            border: 'none', // Removes border when focused
        },
    },
    // Add a bottom border for the clean, line-style input
    '& .MuiInputBase-root': {
        borderBottom: '1px solid #e0e0e0',
        borderRadius: 0,
        paddingLeft: 0,
    }
});

function Navbar() {
    const [hovered, setHovered] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const timeoutRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const open = Boolean(anchorEl);
    const { totalQuantity } = useSelector((state) => state.cart);
    const { searchData, handleInputChange } = useSearch();


    const router = useRouter()

    // Function to open the drawer
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    // Function to close the drawer
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };


    const storedUser = localStorage.getItem("isLoggedIn");

    // useEffect(() => {

    //     if (storedUser) {
    //         setIsLoggedIn(JSON.parse(storedUser));
    //     }
    // }, [storedUser]);

      useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser) {
      setIsLoggedIn(JSON.parse(storedUser));
    }
  }, [storedUser]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const removeUser = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(null);
        router.push("/login");
    };


    const icons = [
        { name: 'Instagram', icon: <InstagramIcon fontSize="small" /> },
        { name: 'Facebook', icon: <FacebookIcon fontSize="small" /> },
        { name: 'Google', icon: <GoogleIcon fontSize="small" /> },
        { name: 'Pinterest', icon: <PinterestIcon fontSize="small" /> },
        { name: 'YouTube', icon: <YouTubeIcon fontSize="small" /> },
        { name: 'Twitter', icon: <TwitterIcon fontSize="small" /> },
    ];

    const navbarItems = [
        { label: 'Bad Basic', subItems: ['Blankets', 'Mattress Protector', 'Fillings', 'Bed Runner', 'Velvet Quilt cover'], path: '/bedbasic' },
        {
            label: 'Duvet Sheets',
            subItems: [
                'Luxury Duvet Sets', 'Silk Duvet Sets', 'Embroidered Duvet Sets', 'Cross Pleated Duvet Sets',
                'Pintucks Duvet Sets', 'Embellish Duvet Sets', 'Rainbow Stripe Duvet Sets', 'Oxford Duvet Sets',
                'Horizontal Stripe Duvet Sets', 'Baratta Sticth Duvet Sets', 'Plain Dyed Duvet Sets',
                'Satin Stripe Duvet Sets', 'Ruffle Duvet Sets', 'Embellish Patch Cotton Sateen Duvet sets',
                'Embroidered Cotton Satin Duvet Sets', 'Cotton Satin Cross Pleated Duvet Sets', 'All Duvet Sets'
            ],
            path: '/duvetsheets'
        },
        { label: 'Bridal Collection', subItems: ['Luxury Bridal Sets', 'Luxury Velvet Duvet Sets', 'Velvet Embroidered Sets'], path: '/bridalcollection' },
        { label: 'Comforter Collection', path: '/comfortercollection' },
        { label: 'Bedsheets', subItems: ['Plain BedSheets', 'Printed bedSheets'], path: '/bedsheets' },
        {
            label: 'Home And Living',
            subItems: ['Sofa Covers', 'Pintuck Pillows', 'Floor Cushions', 'Bath Towels', 'Kitchen Linen', 'Wooden Racks', 'Baby Rug'],
            path: '/homeliving'
        },
        { label: 'Fancy Bedsheets', path: '/fancybedsheets' },
        {
            label: 'Curtains',
            subItems: ['Premium splendid velvet curtain', 'Plain Velvet Curtains', 'Embroidered Curtains', 'Plain Dyed Curtains'],
            path: '/curtains'
        },
        { label: 'Blind Curtains', path: '/blindcurtains' },
        { label: 'Prayer Mats', subItems: ['Prayer Mats Sets', 'Only Prayer Mats'], path: '/prayermats' },
        { label: 'Bedspreads', path: '/bedspreeds' },
        { label: 'Islamic calligraphy', path: '/islamic' },
        { label: 'Work Place', path: '/workplace' },
    ];

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const toggleDrawerOpen = (newOpen) => () => {
        if (newOpen) {
            setDrawerOpen(false);
        }
        setOpenDrawer(newOpen);
    };

    const handleExpand = (index) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setExpandedIndex((prev) => (prev === index ? null : index));
        }, 80);
    };


    const renderSubItems = useCallback((item, index) => (
        <Collapse in={expandedIndex === index} timeout={200} unmountOnExit>
            <List component="div" disablePadding>
                {item.subItems.map((subItem, subIndex) => (
                    <ListItem key={subIndex} sx={{ pl: 4 }}>
                        <Link
                            href={item.path || '#'}
                            style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                            onClick={() => setDrawerOpen(false)}
                        >
                            <ListItemText primary={subItem} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Collapse>
    ), [expandedIndex]);

    return (
        <Box>
            {/* Social Icons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'right' },
                    gap: { xs: 0.5, md: 1 },
                    px: { xs: 1, md: 2 },
                    py: { xs: 0.5, md: 1 },
                    flexWrap: 'wrap',
                    mx: { xs: 0, md: 8 }
                }}
            >
                {icons.map((item, index) => (
                    <Tooltip
                        key={index}
                        title={item.name}
                        placement="top"
                        PopperProps={{
                            modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
                        }}
                        componentsProps={{
                            tooltip: { sx: { fontSize: '0.75rem', p: '2px 8px' } },
                        }}
                    >
                        <IconButton
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            sx={{
                                color: hovered === index ? 'black' : 'lightgray',
                                transition: 'color 0.3s',
                                fontSize: { xs: '18px', md: '24px' },
                            }}
                            disableRipple
                        >
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>


            <Divider />

            <Box sx={{ position: 'relative', mt: 8, height: 'auto', px: 2, mx: { xs: 0, md: 8 } }}>
                {/* Hamburger Icon (Left for small screens) */}

                <Box sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', display: { xs: 'flex', md: 'none' } }}>
                    <IconButton onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
                </Box>


                {/* Center Logo and Tagline */}

                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}
                >
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '20px', sm: '28px', md: '32px' },
                                color: 'black',
                            }}
                        >
                            EPOSH
                        </Typography>
                    </Link>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'cursive',
                            fontStyle: 'italic',
                            fontSize: { xs: '10px', md: '13px' },
                            color: 'black',
                        }}
                    >
                        in your style
                    </Typography>
                </Box>


                {/* Right-side Icons */}

                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        gap: { xs: 0.25, md: 1 },
                    }}
                >
                    <Tooltip title="Search"><IconButton onClick={handleDrawerOpen}><SearchIcon sx={{ fontSize: { xs: '20px', md: '25px' } }} /></IconButton></Tooltip>
                    {isLoggedIn ? (
                        <>
                            <Tooltip title="Account">
                                <IconButton
                                    sx={{ p: { xs: 0.5, sm: 1 } }}
                                    aria-label="User profile"
                                    onClick={handleClick}
                                    id="user-menu-button"
                                    aria-controls={open ? "user-menu" : undefined}
                                    aria-haspopup="true"
                                >
                                    <PersonIcon />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                PaperProps={{
                                    sx: {
                                        borderRadius: 2,
                                        boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                                        minWidth: 220,
                                        p: 1,
                                        mt: 1,
                                    },
                                }}
                            >
                                <MenuItem sx={{
                                    display: "flex", gap: 1.5, ":hover": {
                                        bgcolor: '#d2a857', "& svg": {
                                            color: "white",
                                        }, "& .hover-text": {
                                            color: "white",
                                        },
                                    }
                                }}>
                                    <AccountCircleRoundedIcon color="primary" />
                                    <Typography variant="body1" className="hover-text" fontWeight="bold">
                                        {isLoggedIn?.userName || "User"}
                                    </Typography>
                                </MenuItem>

                                <MenuItem sx={{
                                    display: "flex", gap: 1.5, ":hover": {
                                        bgcolor: '#d2a857', "& svg": {
                                            color: "white",
                                        }, "& .hover-text": {
                                            color: "white",
                                        },
                                    }
                                }}>
                                    <EmailRoundedIcon color="action" />
                                    <Typography variant="body2" className="hover-text" sx={{ color: "text.secondary" }}>
                                        {isLoggedIn?.email || "Email"}
                                    </Typography>
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        removeUser();
                                        handleClose();
                                    }}
                                    sx={{
                                        display: "flex",
                                        gap: 1.5,
                                        mt: 0.5,
                                        "&:hover": {
                                            bgcolor: "error.main",
                                            color: "white",
                                            "& svg": {
                                                color: "white",
                                            },
                                        },
                                    }}
                                >
                                    <LogoutRoundedIcon />
                                    <Typography variant="body2">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Tooltip title="Account">
                            <IconButton
                                onClick={() => router.push("/login")}
                                sx={{ p: { xs: 0.5, sm: 1 } }}
                                aria-label="Login"
                            >
                                <PersonIcon sx={{ fontSize: { xs: "20px", md: "25px" } }} />
                            </IconButton>
                        </Tooltip>
                    )}


                    <Tooltip title="Cart">
                        <IconButton onClick={toggleDrawerOpen(true)}>
                            <Badge
                                badgeContent={totalQuantity}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: { xs: '16px', sm: '20px' },
                                        height: { xs: '16px', sm: '20px' },
                                    },
                                }}
                            >
                                <Box sx={{ fontSize: { xs: '20px', md: '25px' } }}>
                                    <LocalMallIcon fontSize="inherit" />
                                </Box>
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <DrawerProduct
                        openDrawer={openDrawer}
                        toggleDrawerOpen={toggleDrawerOpen}
                    />


                </Box>

            </Box>


            <Box>
                <Drawer
                    anchor="top"
                    open={isDrawerOpen}
                    onClose={handleDrawerClose}
                    // Styling for the drawer paper itself
                    PaperProps={{
                        sx: {
                            height: 'auto',
                            padding: { xs: '1rem', sm: '2rem', md: '3rem' },
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '800px', // Max width for larger screens
                            width: '100%',
                            margin: '0 auto', // Center the content
                        }}
                    >
                        {/* Header section with title and close button */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                WHAT ARE YOU LOOKING FOR?
                            </Typography>
                            <IconButton onClick={handleDrawerClose} aria-label="close search drawer">
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Search input field */}
                        <StyledTextField
                            fullWidth
                            placeholder="Search products..."
                            variant="outlined"
                            value={searchData}
                            onChange={handleInputChange}
                            // The search icon is placed at the end of the input field
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: {
                                    fontSize: '1.5rem', // Larger font for the input text
                                }
                            }}
                        />
                    </Box>
                </Drawer>
            </Box>


            {/* <Divider sx={{ mt: 2 }} /> */}

            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap', backgroundColor: '#d2a857', px: 2, py: 1, mt: 15 }}>
                {navbarItems.map((item, index) => (
                    <Box
                        key={index}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        sx={{ flex: '0 0 calc(100% / 7 - 12px)', textAlign: 'center', position: 'relative' }}
                    >
                        <Link href={item.path || '#'} style={{ textDecoration: 'none', color: 'black'}}   >
                            <MenuItem
                                sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px', justifyContent: 'center', whiteSpace: 'nowrap', '&:hover': { backgroundColor: 'transparent', textDecoration: 'none',  } }}
                            >
                                {item.label}
                                {item.subItems && <KeyboardArrowDownIcon sx={{ fontSize: '16px', ml: 0.5 }} />}
                            </MenuItem>

                            {item.subItems && hoverIndex === index && (
                                <Box sx={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', boxShadow: 3, zIndex: 1000, minWidth: 200, textAlign: 'left', py: 1 }}>
                                    {item.subItems.map((subItem, i) => (
                                        <MenuItem key={i} sx={{ fontSize: '14px', whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                            {subItem}
                                        </MenuItem>
                                    ))}
                                </Box>
                            )}
                        </Link>
                    </Box>
                ))}
            </Box>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 280, px: 2, py: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
                    <List>
                        {navbarItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <Box sx={{ flex: 1 }}>
                                        {item.path ? (
                                            <Link
                                                href={item.path}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                                onClick={() => setDrawerOpen(false)}
                                            >
                                                <ListItemText
                                                    primary={item.label}
                                                    sx={{ transition: 'all 0.2s ease-in-out' }}
                                                />
                                            </Link>
                                        ) : (
                                            <ListItemText
                                                primary={item.label}
                                                sx={{
                                                    cursor: item.subItems ? 'pointer' : 'default',
                                                    transition: 'all 0.2s ease-in-out'
                                                }}
                                                onClick={() => item.subItems && handleExpand(index)}
                                            />
                                        )}
                                    </Box>

                                    {item.subItems && (
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleExpand(index);
                                            }}
                                            sx={{
                                                transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        >
                                            <KeyboardArrowDownIcon />
                                        </IconButton>
                                    )}
                                </ListItem>

                                {item.subItems && renderSubItems(item, index)}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* <Box>
                <Box>
                    <Image
                        src="/image1.webp"
                        alt="Hero"
                        width={1200}
                        height={500}
                        style={{ width: '100%', height: 'auto', marginTop: '16px' }}
                    />
                </Box>
            </Box> */}
        </Box>
    );
}

export default Navbar;