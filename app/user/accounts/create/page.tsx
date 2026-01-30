'use client';

import { Box, Typography, Button, Stack, Paper, Stepper, Step, StepLabel, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, MenuItem, Alert } from '@mui/material';
import { useState } from 'react';

const steps = ['Select Product', 'Personal Details', 'Nominee Details', 'Review & Submit'];

export default function CreateAccountPage() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <Stack spacing={4} sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">Open New Account</Typography>
                <Typography variant="body2" color="text.secondary">Apply for a new Savings, Current, or Deposit account</Typography>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Paper sx={{ p: 4 }}>
                {activeStep === 0 && (
                    <Stack spacing={3}>
                        <Typography variant="h6">Select Account Type</Typography>
                        <FormControl>
                            <RadioGroup defaultValue="savings">
                                <Paper variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel value="savings" control={<Radio />} label={<Typography fontWeight="bold">Savings Account</Typography>} />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>Standard savings account with 3.5% interest p.a.</Typography>
                                </Paper>
                                <Paper variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel value="current" control={<Radio />} label={<Typography fontWeight="bold">Current Account</Typography>} />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>For business professionals, higher transaction limits.</Typography>
                                </Paper>
                                <Paper variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel value="fd" control={<Radio />} label={<Typography fontWeight="bold">Fixed Deposit</Typography>} />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>High returns with lock-in period. Rates up to 7%.</Typography>
                                </Paper>
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                )}

                {activeStep === 1 && (
                    <Stack spacing={3}>
                        <Typography variant="h6">Personal Verification</Typography>
                        <Alert severity="info" sx={{ py: 0 }}>Your details will be fetched from your existing KYC profile.</Alert>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <TextField label="Full Name" defaultValue="John Doe" disabled />
                            <TextField label="Date of Birth" defaultValue="1990-01-01" disabled />
                            <TextField label="PAN Number" defaultValue="ABCDE1234F" disabled />
                            <TextField label="Aadhar Number" defaultValue="xxxx-xxxx-1234" disabled />
                            <TextField label="Mobile Number" defaultValue="+91 9876543210" disabled />
                            <TextField label="Email ID" defaultValue="john@example.com" disabled />
                        </Box>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="My communication address is same as permanent address" />
                    </Stack>
                )}

                {activeStep === 2 && (
                    <Stack spacing={3}>
                        <Typography variant="h6">Nominee Details</Typography>
                        <TextField label="Nominee Name" fullWidth />
                        <TextField label="Relationship" select fullWidth defaultValue="">
                            <MenuItem value="">Select Relationship</MenuItem>
                            <MenuItem value="Spouse">Spouse</MenuItem>
                            <MenuItem value="Parent">Parent</MenuItem>
                            <MenuItem value="Child">Child</MenuItem>
                            <MenuItem value="Sibling">Sibling</MenuItem>
                        </TextField>
                        <TextField label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                        <FormControlLabel control={<Checkbox />} label="Nominee address is same as primary applicant" />
                    </Stack>
                )}

                {activeStep === 3 && (
                    <Stack spacing={3} alignItems="center">
                        <Typography variant="h6" color="success.main">Success!</Typography>
                        <Typography>Please review your details. By clicking verify, an OTP will be sent to your registered mobile.</Typography>
                        <Paper variant="outlined" sx={{ p: 2, width: '100%', bgcolor: '#f9f9f9' }}>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Account Type:</Typography>
                                    <Typography variant="body2" fontWeight="bold">Savings Account</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Applicant:</Typography>
                                    <Typography variant="body2" fontWeight="bold">John Doe</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Nominee:</Typography>
                                    <Typography variant="body2" fontWeight="bold">Jane Doe (Spouse)</Typography>
                                </Box>
                            </Stack>
                        </Paper>
                        <FormControlLabel control={<Checkbox />} label="I agree to the Terms & Conditions" />
                    </Stack>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button variant="contained" onClick={activeStep === steps.length - 1 ? () => { } : handleNext}>
                        {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
}
