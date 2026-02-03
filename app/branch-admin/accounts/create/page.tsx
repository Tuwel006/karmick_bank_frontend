'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Alert,
  Chip,
  Paper,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Person,
  ContactPhone,
  Home,
  Description,
  AccountBalance,
  Upload,
  PhotoCamera
} from '@mui/icons-material';

const steps = [
  'Personal Information',
  'Contact Details', 
  'Address Information',
  'Identity Documents',
  'Account Details',
  'Document Upload'
];

interface CustomerFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  occupation: string;
  annualIncome: string;
  email: string;
  phone: string;
  alternatePhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  permanentAddress: {
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  currentAddress: {
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  sameAsPermanent: boolean;
  aadharNumber: string;
  panNumber: string;
  passportNumber: string;
  drivingLicenseNumber: string;
  accountType: string;
  initialDeposit: string;
  nomineeDetails: {
    name: string;
    relation: string;
    phone: string;
    dateOfBirth: string;
  };
  documents: {
    profilePhoto: File | null;
    aadharCard: File | null;
    panCard: File | null;
    addressProof: File | null;
    incomeProof: File | null;
    signature: File | null;
  };
}

export default function CreateAccountPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: 'SINGLE',
    nationality: 'Indian',
    occupation: '',
    annualIncome: '',
    email: '',
    phone: '',
    alternatePhone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    permanentAddress: {
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    currentAddress: {
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAsPermanent: true,
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    drivingLicenseNumber: '',
    accountType: 'SAVINGS',
    initialDeposit: '',
    nomineeDetails: {
      name: '',
      relation: '',
      phone: '',
      dateOfBirth: ''
    },
    documents: {
      profilePhoto: null,
      aadharCard: null,
      panCard: null,
      addressProof: null,
      incomeProof: null,
      signature: null
    }
  });

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.firstName && formData.lastName && formData.dateOfBirth && formData.gender);
      case 1:
        return !!(formData.email && formData.phone);
      case 2:
        return !!(formData.permanentAddress.addressLine1 && formData.permanentAddress.city && formData.permanentAddress.state && formData.permanentAddress.pincode);
      case 3:
        return !!(formData.aadharNumber && formData.panNumber);
      case 4:
        return !!(formData.accountType && formData.initialDeposit);
      case 5:
        return !!(formData.documents.profilePhoto && formData.documents.aadharCard && formData.documents.panCard);
      default:
        return true;
    }
  };

  const handleFileUpload = (field: keyof CustomerFormData['documents'], file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const submitData = new FormData();
      
      submitData.append('customerData', JSON.stringify({
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        nationality: formData.nationality,
        occupation: formData.occupation,
        annualIncome: parseFloat(formData.annualIncome),
        email: formData.email,
        phone: formData.phone,
        alternatePhone: formData.alternatePhone,
        aadharNumber: formData.aadharNumber,
        panNumber: formData.panNumber,
        passportNumber: formData.passportNumber,
        drivingLicenseNumber: formData.drivingLicenseNumber,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        emergencyContactRelation: formData.emergencyContactRelation,
        permanentAddress: formData.permanentAddress,
        currentAddress: formData.sameAsPermanent ? formData.permanentAddress : formData.currentAddress,
        branchId: localStorage.getItem('branchId')
      }));

      submitData.append('accountData', JSON.stringify({
        accountType: formData.accountType,
        initialDeposit: parseFloat(formData.initialDeposit),
        nomineeDetails: formData.nomineeDetails
      }));

      Object.entries(formData.documents).forEach(([key, file]) => {
        if (file) {
          submitData.append(key, file);
        }
      });

      const response = await fetch('/api/accounts/create-with-customer', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: submitData
      });

      if (response.ok) {
        alert('Account created successfully!');
      }
    } catch (error) {
      console.error('Failed to create account:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <ContactInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <AddressInfoStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <IdentityDocumentsStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <AccountDetailsStep formData={formData} setFormData={setFormData} />;
      case 5:
        return <DocumentUploadStep formData={formData} onFileUpload={handleFileUpload} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Create New Account
      </Typography>

      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} orientation="horizontal">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        <Box sx={{ minHeight: 400 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading || !validateStep(activeStep)}
            >
              Create Account
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!validateStep(activeStep)}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

function PersonalInfoStep({ formData, setFormData }: any) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Person sx={{ mr: 1 }} />
          <Typography variant="h6">Personal Information</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name *"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Middle Name"
              value={formData.middleName}
              onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name *"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth *"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={formData.maritalStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: e.target.value }))}
              >
                <MenuItem value="SINGLE">Single</MenuItem>
                <MenuItem value="MARRIED">Married</MenuItem>
                <MenuItem value="DIVORCED">Divorced</MenuItem>
                <MenuItem value="WIDOWED">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nationality"
              value={formData.nationality}
              onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Occupation"
              value={formData.occupation}
              onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Annual Income (₹)"
              type="number"
              value={formData.annualIncome}
              onChange={(e) => setFormData(prev => ({ ...prev, annualIncome: e.target.value }))}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ContactInfoStep({ formData, setFormData }: any) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <ContactPhone sx={{ mr: 1 }} />
          <Typography variant="h6">Contact Information</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Alternate Phone"
              value={formData.alternatePhone}
              onChange={(e) => setFormData(prev => ({ ...prev, alternatePhone: e.target.value }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Emergency Contact</Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Emergency Contact Name"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Emergency Contact Phone"
              value={formData.emergencyContactPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Relation"
              value={formData.emergencyContactRelation}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactRelation: e.target.value }))}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function AddressInfoStep({ formData, setFormData }: any) {
  const handleSameAsPermanentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAsPermanent: checked,
      currentAddress: checked ? prev.permanentAddress : {
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    }));
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Home sx={{ mr: 1 }} />
          <Typography variant="h6">Address Information</Typography>
        </Box>
        
        <Typography variant="subtitle1" gutterBottom>Permanent Address</Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <TextField
              label="Address Line 1 *"
              value={formData.permanentAddress.addressLine1}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, addressLine1: e.target.value }
              }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Address Line 2"
              value={formData.permanentAddress.addressLine2}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, addressLine2: e.target.value }
              }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Landmark"
              value={formData.permanentAddress.landmark}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, landmark: e.target.value }
              }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="City *"
              value={formData.permanentAddress.city}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, city: e.target.value }
              }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="State *"
              value={formData.permanentAddress.state}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, state: e.target.value }
              }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Pincode *"
              value={formData.permanentAddress.pincode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, pincode: e.target.value }
              }))}
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Country"
              value={formData.permanentAddress.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, country: e.target.value }
              }))}
              fullWidth
            />
          </Grid>
        </Grid>
        
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.sameAsPermanent}
              onChange={(e) => handleSameAsPermanentChange(e.target.checked)}
            />
          }
          label="Current address is same as permanent address"
        />
      </CardContent>
    </Card>
  );
}

function IdentityDocumentsStep({ formData, setFormData }: any) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Description sx={{ mr: 1 }} />
          <Typography variant="h6">Identity Documents</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Aadhar Number *"
              value={formData.aadharNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, aadharNumber: e.target.value }))}
              fullWidth
              required
              inputProps={{ maxLength: 12 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="PAN Number *"
              value={formData.panNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
              fullWidth
              required
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Passport Number"
              value={formData.passportNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Driving License Number"
              value={formData.drivingLicenseNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, drivingLicenseNumber: e.target.value }))}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function AccountDetailsStep({ formData, setFormData }: any) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <AccountBalance sx={{ mr: 1 }} />
          <Typography variant="h6">Account Details</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Account Type</InputLabel>
              <Select
                value={formData.accountType}
                onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
              >
                <MenuItem value="SAVINGS">Savings Account</MenuItem>
                <MenuItem value="CURRENT">Current Account</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Initial Deposit (₹) *"
              type="number"
              value={formData.initialDeposit}
              onChange={(e) => setFormData(prev => ({ ...prev, initialDeposit: e.target.value }))}
              fullWidth
              required
              inputProps={{ min: 1000 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Nominee Details</Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nominee Name"
              value={formData.nomineeDetails.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                nomineeDetails: { ...prev.nomineeDetails, name: e.target.value }
              }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Relation"
              value={formData.nomineeDetails.relation}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                nomineeDetails: { ...prev.nomineeDetails, relation: e.target.value }
              }))}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nominee Phone"
              value={formData.nomineeDetails.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                nomineeDetails: { ...prev.nomineeDetails, phone: e.target.value }
              }))}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function DocumentUploadStep({ formData, onFileUpload }: any) {
  const documentTypes = [
    { key: 'profilePhoto', label: 'Profile Photo', required: true },
    { key: 'aadharCard', label: 'Aadhar Card', required: true },
    { key: 'panCard', label: 'PAN Card', required: true },
    { key: 'addressProof', label: 'Address Proof', required: false },
    { key: 'incomeProof', label: 'Income Proof', required: false },
    { key: 'signature', label: 'Signature', required: false }
  ];

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Upload sx={{ mr: 1 }} />
          <Typography variant="h6">Document Upload</Typography>
        </Box>
        
        <Grid container spacing={3}>
          {documentTypes.map((doc) => (
            <Grid item xs={12} sm={6} key={doc.key}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {doc.label} {doc.required && '*'}
                </Typography>
                
                {formData.documents[doc.key] ? (
                  <Box>
                    <Chip
                      label={formData.documents[doc.key].name}
                      onDelete={() => onFileUpload(doc.key, null)}
                      color="success"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                    fullWidth
                  >
                    Upload {doc.label}
                    <input
                      type="file"
                      hidden
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileUpload(doc.key, file);
                      }}
                    />
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Alert severity="info" sx={{ mt: 3 }}>
          Please ensure all documents are clear and readable. Accepted formats: JPG, PNG, PDF (Max 5MB each)
        </Alert>
      </CardContent>
    </Card>
  );
}