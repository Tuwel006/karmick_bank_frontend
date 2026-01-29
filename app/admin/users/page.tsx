'use client';

import { Box, Typography } from '@mui/material';
import AddUser from './features/AddUser';

export default function UsersPage() {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Users</Typography>
                <AddUser />
            </Box>
        </Box>
    );
}