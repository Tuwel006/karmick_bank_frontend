'use client';

import { Box, Card, CardContent, Typography, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, TextField, Switch, FormControlLabel } from '@mui/material';
import { Save, Refresh, Warning } from '@mui/icons-material';

export default function ConfigPage() {
    return (
        <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" color="primary" fontWeight="bold">System Configuration</Typography>
                    <Typography variant="body2" color="text.secondary">Global system settings and technical parameters</Typography>
                </Box>
                <Button variant="contained" startIcon={<Save />}>Save Changes</Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Bank Identity</Typography>
                        <Stack spacing={2}>
                            <TextField fullWidth label="Bank Name" defaultValue="Karmick Bank" size="small" />
                            <TextField fullWidth label="Bank Short Code" defaultValue="KB" size="small" />
                            <TextField fullWidth label="Head Office Address" defaultValue="123 Bank Plaza, Kolkata, WB" size="small" multiline rows={2} />
                            <TextField fullWidth label="Support Email" defaultValue="support@karmickbank.com" size="small" />
                        </Stack>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Security Settings</Typography>
                        <Stack spacing={1}>
                            <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Enable Dual Authentication (MFA)" />
                            <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Enforce Strong Password Policy" />
                            <FormControlLabel control={<Switch color="error" />} label="Maintenance Mode (Disable Logins)" />
                            <Divider sx={{ my: 1 }} />
                            <TextField fullWidth label="Session Timeout (Minutes)" defaultValue="15" type="number" size="small" />
                            <TextField fullWidth label="Max Login Attempts" defaultValue="5" type="number" size="small" />
                        </Stack>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>API & Integration</Typography>
                        <Stack spacing={2}>
                            <TextField fullWidth label="Core Banking API Endpoint" defaultValue="https://cbs.karmickbank.internal/v1" size="small" />
                            <TextField fullWidth label="SMS Gateway API Key" defaultValue="********-****-****-****-************" type="password" size="small" />
                            <TextField fullWidth label="Email SMTP Server" defaultValue="smtp.karmickbank.com" size="small" />
                        </Stack>
                    </CardContent>
                </Card>

                <Card sx={{ bgcolor: '#fff3e0' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'warning.dark' }}>
                            <Warning fontSize="small" />
                            <Typography variant="h6">Critical Actions</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 3 }}>These actions cannot be undone and may cause system downtime.</Typography>
                        <Stack spacing={2}>
                            <Button variant="outlined" color="error" fullWidth startIcon={<Refresh />}>Purge Transaction Logs (&gt; 2 yrs)</Button>
                            <Button variant="outlined" color="error" fullWidth>Clear All Session Caches</Button>
                            <Button variant="contained" color="error" fullWidth>Emergency System Shutdown</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Stack>
    );
}
