import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Button, 
  useTheme, 
  alpha,
  Card,
  CardContent,
} from '@mui/material';
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
  const theme = useTheme();

  return (
    <Container maxWidth='lg'>
      {/* Hero section */}
      <Box 
        sx={{ 
          my: { xs: 6, md: 10 }, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '-0.02em',
            mb: 3,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(90deg, #2997ff 0%, #5ac8fa 100%)' 
              : 'linear-gradient(90deg, #0071e3 0%, #42a5f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('home:title')}
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          paragraph
          sx={{
            fontWeight: 500,
            maxWidth: '800px',
            mb: 3,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            lineHeight: 1.4,
          }}
        >
          {t('home:subtitle')}
        </Typography>
        <Typography
          variant='body1'
          paragraph
          sx={{
            maxWidth: '700px',
            mb: 4,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.6,
          }}
        >
          {t('home:content')}
        </Typography>
      </Box>

      {/* Features section */}
      <Box sx={{ my: { xs: 6, md: 10 } }}>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          textAlign='center'
          sx={{
            fontWeight: 600,
            mb: 4,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
          }}
        >
          {t('home:features.title')}
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{ mt: 2 }}
        >
          {/* Feature 1 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Card
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 20px rgba(0,0,0,0.3)'
                    : '0 10px 20px rgba(0,0,0,0.1)',
                },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 3 } }}>
                <Typography
                  variant='h6'
                  component='h3'
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {t('home:features.registration')}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  Register your pets quickly and securely in our system.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Card
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 20px rgba(0,0,0,0.3)'
                    : '0 10px 20px rgba(0,0,0,0.1)',
                },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 3 } }}>
                <Typography
                  variant='h6'
                  component='h3'
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {t('home:features.tracking')}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  Track and manage your pet's identification information in one place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Card
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 20px rgba(0,0,0,0.3)'
                    : '0 10px 20px rgba(0,0,0,0.1)',
                },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 3 } }}>
                <Typography
                  variant='h6'
                  component='h3'
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {t('home:features.management')}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  Comprehensive tools to manage all aspects of your pet's identity.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 4 */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Card
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 20px rgba(0,0,0,0.3)'
                    : '0 10px 20px rgba(0,0,0,0.1)',
                },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 3 } }}>
                <Typography
                  variant='h6'
                  component='h3'
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {t('home:features.recovery')}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  Increase the chances of reuniting with your lost pet.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call to action section */}
      <Box 
        sx={{ 
          my: { xs: 6, md: 10 }, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          variant='contained'
          size='large'
          color='primary'
          sx={{ 
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: theme.palette.mode === 'dark' 
                ? '#1e87e8' 
                : '#0062c3',
            },
          }}
        >
          {t('home:cta.register')}
        </Button>
        <Button
          variant='outlined'
          size='large'
          sx={{ 
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
            borderWidth: 1.5,
            '&:hover': {
              borderWidth: 1.5,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          {t('home:cta.learn')}
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
