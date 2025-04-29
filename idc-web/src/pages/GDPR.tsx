import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * GDPR page component
 * Provides information about data protection and privacy policies
 * in compliance with General Data Protection Regulation (GDPR)
 *
 * @returns {JSX.Element} The rendered GDPR page
 */
const GDPR = () => {
  // Initialize translation hook
  const { t } = useTranslation(['gdpr', 'common']);

  return (
    <Container maxWidth='lg'>
      {/* Page header */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom>
          {t('gdpr:title')}
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          paragraph>
          {t('gdpr:subtitle')}
        </Typography>
      </Box>

      {/* Main content */}
      <Paper
        elevation={2}
        sx={{ p: 4, mb: 4 }}>
        <Typography
          variant='body1'
          paragraph>
          {t('gdpr:content')}
        </Typography>

        {/* GDPR sections */}
        <Grid
          container
          spacing={4}
          sx={{ mt: 2 }}>
          {/* Data Collection Section */}
          <Grid
            item
            xs={12}
            md={6}>
            <Box>
              <Typography
                variant='h5'
                component='h2'
                gutterBottom
                color='primary'>
                {t('gdpr:sections.dataCollection.title')}
              </Typography>
              <Typography
                variant='body1'
                paragraph>
                {t('gdpr:sections.dataCollection.content')}
              </Typography>
            </Box>
          </Grid>

          {/* Data Use Section */}
          <Grid
            item
            xs={12}
            md={6}>
            <Box>
              <Typography
                variant='h5'
                component='h2'
                gutterBottom
                color='primary'>
                {t('gdpr:sections.dataUse.title')}
              </Typography>
              <Typography
                variant='body1'
                paragraph>
                {t('gdpr:sections.dataUse.content')}
              </Typography>
            </Box>
          </Grid>

          {/* Divider for visual separation */}
          <Grid
            item
            xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Data Protection Section */}
          <Grid
            item
            xs={12}
            md={6}>
            <Box>
              <Typography
                variant='h5'
                component='h2'
                gutterBottom
                color='primary'>
                {t('gdpr:sections.dataProtection.title')}
              </Typography>
              <Typography
                variant='body1'
                paragraph>
                {t('gdpr:sections.dataProtection.content')}
              </Typography>
            </Box>
          </Grid>

          {/* Your Rights Section */}
          <Grid
            item
            xs={12}
            md={6}>
            <Box>
              <Typography
                variant='h5'
                component='h2'
                gutterBottom
                color='primary'>
                {t('gdpr:sections.yourRights.title')}
              </Typography>
              <Typography
                variant='body1'
                paragraph>
                {t('gdpr:sections.yourRights.content')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Contact information for data protection inquiries */}
      <Paper
        elevation={2}
        sx={{ p: 4 }}>
        <Typography
          variant='h5'
          component='h2'
          gutterBottom
          color='primary'>
          {t('gdpr:contact.title')}
        </Typography>
        <Typography variant='body1'>{t('gdpr:contact.content')}</Typography>
      </Paper>
    </Container>
  );
};

export default GDPR;
