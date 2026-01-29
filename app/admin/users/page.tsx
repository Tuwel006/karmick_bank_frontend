'use client';

import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function UsersPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ ml: 'auto' }}>
          Add User
        </Button>
      </Box>
    </Box>
  );
}