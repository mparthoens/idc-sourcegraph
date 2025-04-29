import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

/**
 * Contact page component
 * Provides a contact form and displays company contact information
 *
 * @returns {JSX.Element} The rendered Contact page
 */
const Contact = () => {
  // Initialize translation hook
  const { t } = useTranslation(['contact', 'common']);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Success/error message state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handles form input changes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles form submission
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);

    // Simulate successful submission
    setIsSuccess(true);
    setOpenSnackbar(true);

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  /**
   * Closes the snackbar notification
   */
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth='lg'>
      {/* Page header */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom>
          {t('contact:title')}
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          paragraph>
          {t('contact:subtitle')}
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}>
        {/* Contact form */}
        <Grid
          item
          xs={12}
          md={7}>
          <Paper
            elevation={3}
            sx={{ p: 4 }}>
            <Typography
              variant='h5'
              component='h2'
              gutterBottom>
              {t('contact:form.title', 'Send us a message')}
            </Typography>

            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate>
              <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label={t('contact:form.name')}
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label={t('contact:form.email')}
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='subject'
                label={t('contact:form.subject')}
                name='subject'
                value={formData.subject}
                onChange={handleChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='message'
                label={t('contact:form.message')}
                name='message'
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                {t('contact:form.submit')}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Contact information */}
        <Grid
          item
          xs={12}
          md={5}>
          <Paper
            elevation={3}
            sx={{ p: 4 }}>
            <Typography
              variant='h5'
              component='h2'
              gutterBottom>
              {t('contact:contact.title')}
            </Typography>

            <Box sx={{ mt: 3 }}>
              {/* Address */}
              <Box sx={{ display: 'flex', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant='body1'>
                  {t('contact:contact.address')}
                </Typography>
              </Box>

              {/* Phone */}
              <Box sx={{ display: 'flex', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant='body1'>
                  {t('contact:contact.phone')}
                </Typography>
              </Box>

              {/* Email */}
              <Box sx={{ display: 'flex', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant='body1'>
                  {t('contact:contact.email')}
                </Typography>
              </Box>

              {/* Business hours */}
              <Box sx={{ display: 'flex', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant='body1'>
                  {t('contact:contact.hours')}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Success/error notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {isSuccess ? t('contact:success') : t('contact:error')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
