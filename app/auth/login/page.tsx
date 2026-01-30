'use client';

import { Box, TextField, Button, Typography, Paper, Container, Stack, InputAdornment, IconButton } from '@mui/material';
import { AccountBalance, Security, Visibility, VisibilityOff } from '@mui/icons-material';
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
  const [showPassword, setShowPassword] = useState(false);

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
        } else {
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
      bgcolor: '#f4f6f8',
      backgroundImage: 'linear-gradient(135deg, #f4f6f8 0%, #e3e8ed 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Brand Shapes */}
      <Box sx={{ position: 'absolute', top: -150, right: -150, width: 500, height: 500, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.03 }} />
      <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.05 }} />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: '1px solid #e0e4e8',
            boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
            bgcolor: 'white'
          }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: 1,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                margin: '0 auto',
                mb: 2,
                boxShadow: '0 4px 10px rgba(40,0,113,0.2)'
              }}
            >
              <AccountBalance sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
              Secure Login
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 1 }}>
              INTERNET BANKING PORTAL
            </Typography>
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                name="email"
                label="Registered Email"
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
                label="Transaction Password"
                type={showPassword ? 'text' : 'password'}
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 700 }}>
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.2,
                  borderRadius: 1.5,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  bgcolor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(40,0,113,0.3)',
                  '&:hover': {
                    bgcolor: '#1e0055',
                    boxShadow: '0 6px 16px rgba(40,0,113,0.4)'
                  }
                }}
              >
                {isLoading ? 'Authenticating...' : 'Login Securely'}
              </Button>

              <Typography variant="caption" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
                By logging in, you agree to our <br />
                <span style={{ color: '#280071', fontWeight: 600, cursor: 'pointer' }}>Terms of Service</span> & <span style={{ color: '#280071', fontWeight: 600, cursor: 'pointer' }}>Security Policies</span>
              </Typography>
            </Stack>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Security sx={{ fontSize: 14 }} /> 128-bit SSL Encrypted Session
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}