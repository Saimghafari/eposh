"use client";
import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Stack, Paper, Menu,
    MenuItem,
    CircularProgress,
    Input,
    FormLabel,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import * as Yup from 'yup'
import Link from 'next/link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Snackbar from '@mui/material/Snackbar';



const getUser = () => JSON.parse(localStorage.getItem('user')) || [];
const setUser = (user) => localStorage.setItem('users', JSON.stringify(user));

function page() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };


    const validationSchema = Yup.object({
        userName: Yup.string().min(3, 'User Name must be at least 3 characters').required('User Name is required'),
        email: Yup.string().email('Invalid Email').required('Email Required'),
        country: Yup.string().required('Country is required'),
        password: Yup.string().min(8, 'Password must be 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm your password'),
    });

    const handleSignup = (values, { resetForm }) => {
        const { userName, email, country, password } = values;
        const users = getUser();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            setSnackbarMessage('User already exists');
            setSnackbarOpen(true);
        } else {
            users.push({ userName, email, country, password });
            setUser(users);
            setSnackbarMessage('Sign Up Successfully');
            setSnackbarOpen(true);
            resetForm();
        }
    }
    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9fafb"
            sx={{ mt: { xs: 15, md: 4 } }} >
            <Paper elevation={3}
                sx={{
                    width: 370,
                    padding: 4,
                    borderRadius: 3,
                }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Sign Up</Typography>

                <Formik
                    initialValues={{ userName: '', email: '', country: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="User Name"
                                    name="userName"
                                    fullWidth
                                    {...formik.getFieldProps('userName')}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    {...formik.getFieldProps('email')}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <FormControl fullWidth required sx={{ mt: 3 }}>
                                    <InputLabel>Country</InputLabel>
                                    <Select
                                        name="country"
                                        label="Country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.country && !!formik.errors.country}
                                    >
                                        <MenuItem value="Pakistan">Pakistan</MenuItem>
                                        <MenuItem value="UK">UK</MenuItem>
                                        <MenuItem value="USA">USA</MenuItem>
                                        <MenuItem value="China">China</MenuItem>
                                        <MenuItem value="Australia">Australia</MenuItem>
                                    </Select>
                                    {formik.touched.country && formik.errors.country && (
                                        <Typography color="error" variant="caption">{formik.errors.country}</Typography>
                                    )}
                                </FormControl>
                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    fullWidth
                                    {...formik.getFieldProps('password')}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
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
                                <TextField
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    fullWidth
                                    {...formik.getFieldProps('confirmPassword')}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button type="submit" variant="contained"
                                    sx={{ backgroundColor: '#d2a857', textTransform: 'none', fontWeight: 'bold', py: 1.5 }} >
                                    Sign Up
                                </Button>

                                <Typography variant="body2" align="center">
                                    Already have an account?{" "}
                                    <Link href="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                                        Login
                                    </Link>
                                </Typography>

                            </Stack>
                        </form>
                    )}
                </Formik>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />

        </Box>
    )
}

export default page