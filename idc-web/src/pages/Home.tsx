import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Home page component
 * Serves as the landing page for the application, providing an overview
 * of the ID Chips service and its key features.
 *
 * @returns {JSX.Element} The rendered Home page
 */
const Home = () => {
  // Initialize translation hook
  const { t } = useTranslation(['home', 'common']);

  return (
    <Container maxWidth='lg'>
      {/* Hero section */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom>
          {t('home:title')}
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          paragraph>
          {t('home:subtitle')}
        </Typography>
        <Typography
          variant='body1'
          paragraph>
          {t('home:content')}
        </Typography>
      </Box>

      {/* Features section */}
      <Box sx={{ my: 6 }}>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          textAlign='center'>
          {t('home:features.title')}
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{ mt: 2 }}>
          {/* Feature 1 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography
                variant='h6'
                component='h3'
                gutterBottom>
                {t('home:features.registration')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ flexGrow: 1 }}>
                Register your pets quickly and securely in our system.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 2 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography
                variant='h6'
                component='h3'
                gutterBottom>
                {t('home:features.tracking')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ flexGrow: 1 }}>
                Track and manage your pet's identification information in one
                place.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 3 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography
                variant='h6'
                component='h3'
                gutterBottom>
                {t('home:features.management')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ flexGrow: 1 }}>
                Comprehensive tools to manage all aspects of your pet's
                identity.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 4 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography
                variant='h6'
                component='h3'
                gutterBottom>
                {t('home:features.recovery')}
              </Typography>
              <Typography
                variant='body2'
                sx={{ flexGrow: 1 }}>
                Increase the chances of reuniting with your lost pet.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Call to action section */}
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Button
          variant='contained'
          size='large'
          color='primary'
          sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}>
          {t('home:cta.register')}
        </Button>
        <Button
          variant='outlined'
          size='large'>
          {t('home:cta.learn')}
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
