'use client';

import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { loginUser } from './services/authService';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp > currentTime) {
          const role = payload.role;
          if (role === 'admin') {
            router.push('/admin');
            return;
          } else {
            router.push('/user');
            return;
          }
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, [router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await loginUser(values.email, values.password);
        console.log(response);
        
        toast.success('Login successful');
        localStorage.setItem('token', (response as any).access_token);
        
        const userRole = (response as any).user?.role;
        if (userRole === 'admin') {
          router.push('/admin');
        } else{
          router.push('/user');
        } 
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'Login failed';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Container maxWidth="sm">
        <Paper sx={{
          p: 0,
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          width: 450
        }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            p: 3,
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              Sign in to your account
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label={<>Email <span style={{ color: 'red' }}>*</span></>}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 }
                }}
              />
              <TextField
                fullWidth
                name="password"
                label={<>Password <span style={{ color: 'red' }}>*</span></>}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)'
                  }
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}