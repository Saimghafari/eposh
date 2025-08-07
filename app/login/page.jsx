"use client";
import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    InputAdornment,
    IconButton
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

function page() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChangeVisibility = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const router = useRouter()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const matchUser = users.find(
            u => u.email === credentials.email && u.password === credentials.password
        );

        if (matchUser) {
            setSnackbarMessage(`WelCome back ${matchUser.email}`);
            setSnackbarOpen(true);
            localStorage.setItem('isLoggedIn', JSON.stringify(matchUser));

            router.refresh();   // Refresh the current route.

            setTimeout(() => {
                router.push('/');
            }, 500);
        } else {
            setSnackbarMessage('User not found!');
            setSnackbarOpen(true);
        }

        setCredentials({ email: '', password: '' });
    }

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (isLoggedIn) {
            router.push('/');
        }
    }, []);


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9fafb"
            sx={{ mt: { xs: 15, md: 4 } }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: 370,
                    padding: 4,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Login
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                    Enter your email below to login to your account
                </Typography>
                <form onSubmit={handleLogin}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            name='email'
                            value={credentials.email}
                            onChange={handleChange}
                            label="Email"
                            placeholder="m@example.com"
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={handleChangeVisibility}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />


                        <Button
                            fullWidth
                            variant="contained"
                            type='submit'
                            sx={{ backgroundColor: '#d2a857', textTransform: 'none', fontWeight: 'bold', py: 1.5 }}
                        >
                            Login
                        </Button>
                        {/* {message && <Typography color="error">{message}</Typography>} */}
                        <Typography variant="body2" align="center">
                            Don't have account?{" "}
                            <Link href="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="#1976d2" onClick={handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Box>
    )
}

export default page