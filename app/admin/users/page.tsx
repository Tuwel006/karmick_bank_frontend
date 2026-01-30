'use client';

import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Avatar,
    Stack,
    Button,
    TextField,
    MenuItem,
    Grid
} from '@mui/material';
import { Edit, Delete, Search, FilterList } from '@mui/icons-material';
import AddUser from './features/AddUser';

const users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Customer', status: 'Active', joined: '15-Jan-2025', branch: 'Main' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Admin', status: 'Active', joined: '20-Nov-2024', branch: 'Main' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Staff', status: 'Inactive', joined: '05-Jan-2025', branch: 'Sub' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Customer', status: 'Blocked', joined: '12-Dec-2024', branch: 'Main' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Customer', status: 'Active', joined: '28-Jan-2025', branch: 'Remote' },
];

export default function UsersPage() {
    return (
        <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" color="primary" fontWeight="bold">User Management</Typography>
                    <Typography variant="body2" color="text.secondary">Maintain system users and their access controls</Typography>
                </Box>
                <AddUser />
            </Box>

            <Paper sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Search Name / Email" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField select fullWidth label="Role" size="small" defaultValue="All">
                            <MenuItem value="All">All Roles</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Staff">Staff</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Button variant="outlined" fullWidth startIcon={<FilterList />}>Filter</Button>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Profile</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Branch</TableCell>
                            <TableCell>Joined Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar sx={{ bgcolor: 'secondary.light', width: 28, height: 28, fontSize: '0.8rem' }}>{user.name[0]}</Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>{user.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        size="small"
                                        color={user.role === 'Admin' ? 'primary' : 'default'}
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.7rem' }}
                                    />
                                </TableCell>
                                <TableCell>{user.branch}</TableCell>
                                <TableCell>{user.joined}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={user.status}
                                        size="small"
                                        color={user.status === 'Active' ? 'success' : user.status === 'Inactive' ? 'warning' : 'error'}
                                        sx={{ height: 20, fontSize: '0.7rem' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                                    <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}