'use client';

import { Box, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function UserPage() {
  return (
    <ProtectedRoute requiredRole="customer">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">User Dashboard</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Welcome to your dashboard!
        </Typography>
      </Box>
    </ProtectedRoute>
  );
}