'use client';

import { Box, Card, Typography, Button, Stack, Paper, Grid, Avatar, Divider, TextField, MenuItem } from '@mui/material';
import { CreditCard, HistoryEdu, Person, GppGood, SupportAgent, VerifiedUser } from '@mui/icons-material';

const services = [
    { title: 'Debit Card Services', desc: 'Manage PIN, Block Card, Modify Limits', icon: <CreditCard />, color: '#e3f2fd' },
    { title: 'Cheque Book Request', desc: 'Request new book, Stop payment', icon: <HistoryEdu />, color: '#e8f5e9' },
    { title: 'Tax & GST', desc: 'View 26AS, Form 16A, GST Payments', icon: <Person />, color: '#fff3e0' },
    { title: 'Locker Services', desc: 'Apply for locker, Check availability', icon: <VerifiedUser />, color: '#fce4ec' },
    { title: 'Investments', desc: 'Mutual Funds, Insurance, PPF', icon: <GppGood />, color: '#f3e5f5' },
    { title: 'Support Helpdesk', desc: 'Raise a ticket, Check status', icon: <SupportAgent />, color: '#e1f5fe' },
];

export default function ServicesPage() {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">Service Requests</Typography>
                <Typography variant="body2" color="text.secondary">Access all banking services and self-service options</Typography>
            </Box>

            <Grid container spacing={2}>
                {services.map((s, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                        <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }} variant="outlined">
                            <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                                <Avatar sx={{ bgcolor: s.color, color: 'text.primary' }}>{s.icon}</Avatar>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">{s.title}</Typography>
                                    <Typography variant="caption" color="text.secondary">{s.desc}</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Divider />

            <Typography variant="h6">Quick Request</Typography>
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth label="Service Type" size="small">
                            <MenuItem value="1">Block Debit Card</MenuItem>
                            <MenuItem value="2">New Cheque Book</MenuItem>
                            <MenuItem value="3">Update Email/Mobile</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth label="Reference Number (Optional)" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Button variant="contained" fullWidth size="large">Submit Request</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Card>
                <Box sx={{ p: 2, bgcolor: '#f5f7fa' }}>
                    <Typography variant="subtitle2" fontWeight="bold">Your Recent Requests</Typography>
                </Box>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">No active service requests found in last 30 days.</Typography>
                </Box>
            </Card>
        </Stack>
    );
}
