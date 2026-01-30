'use client';

import { Box, Button, Typography, Modal, TextField, IconButton, Stack } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../services/userService';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone is required'),
});

export default function AddUser() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
        if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            phone: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await createUser(values);
                toast.success('User added successfully');
                setOpen(false);
                formik.resetForm();
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || 'Failed to create user';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    return (
        <>
            <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
                Add User
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    bgcolor: 'background.paper',
                    p: 0,
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        bgcolor: 'primary.main',
                        p: 1.5,
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Add New User</Typography>
                        <IconButton onClick={handleClose} size="small" sx={{ color: 'white' }}>
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                size="small"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                size="small"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                size="small"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                fullWidth
                                name="phone"
                                label="Phone"
                                size="small"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onKeyDown={handlePhoneKeyDown}
                                inputProps={{ maxLength: 10 }}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => formik.handleSubmit()}
                                disabled={isLoading}
                                sx={{ mt: 1 }}
                            >
                                {isLoading ? 'Creating...' : 'Create User'}
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}