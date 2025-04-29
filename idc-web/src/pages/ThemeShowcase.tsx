// src/pages/ThemeShowcase.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  AlertTitle,
  CircularProgress,
  LinearProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

/**
 * ThemeShowcase component displays various Material-UI components
 * to showcase the application's theme settings
 */
const ThemeShowcase = () => {
  // Access the theme object
  const theme = useTheme();

  // State for tabs
  const [tabValue, setTabValue] = React.useState(0);

  // Handler for tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pb: 8 }}>
      <Typography
        variant='h2'
        gutterBottom>
        Theme Showcase
      </Typography>
      <Typography
        variant='subtitle1'
        gutterBottom
        sx={{ mb: 4 }}>
        This page displays all the styled components using our custom theme.
      </Typography>

      {/* Typography Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Typography
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography
          variant='h1'
          gutterBottom>
          h1. Heading
        </Typography>
        <Typography
          variant='h2'
          gutterBottom>
          h2. Heading
        </Typography>
        <Typography
          variant='h3'
          gutterBottom>
          h3. Heading
        </Typography>
        <Typography
          variant='h4'
          gutterBottom>
          h4. Heading
        </Typography>
        <Typography
          variant='h5'
          gutterBottom>
          h5. Heading
        </Typography>
        <Typography
          variant='h6'
          gutterBottom>
          h6. Heading
        </Typography>
        <Typography
          variant='subtitle1'
          gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography>
        <Typography
          variant='subtitle2'
          gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography>
        <Typography
          variant='body1'
          gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus.
        </Typography>
        <Typography
          variant='body2'
          gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus.
        </Typography>
        <Typography
          variant='button'
          display='block'
          gutterBottom>
          button text
        </Typography>
        <Typography
          variant='caption'
          display='block'
          gutterBottom>
          caption text
        </Typography>
        <Typography
          variant='overline'
          display='block'
          gutterBottom>
          overline text
        </Typography>
      </Paper>

      {/* Colors Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Colors
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={2}>
          {/* Primary colors */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}>
              <Typography variant='subtitle2'>Primary Main</Typography>
              <Typography variant='caption'>
                {theme.palette.primary.main}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}>
              <Typography variant='subtitle2'>Primary Light</Typography>
              <Typography variant='caption'>
                {theme.palette.primary.light}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'primary.dark',
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
              }}>
              <Typography variant='subtitle2'>Primary Dark</Typography>
              <Typography variant='caption'>
                {theme.palette.primary.dark}
              </Typography>
            </Box>
          </Grid>

          {/* Secondary colors */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}>
              <Typography variant='subtitle2'>Secondary Main</Typography>
              <Typography variant='caption'>
                {theme.palette.secondary.main}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'secondary.light',
                color: 'secondary.contrastText',
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}>
              <Typography variant='subtitle2'>Secondary Light</Typography>
              <Typography variant='caption'>
                {theme.palette.secondary.light}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'secondary.dark',
                color: 'secondary.contrastText',
                p: 2,
                borderRadius: 1,
              }}>
              <Typography variant='subtitle2'>Secondary Dark</Typography>
              <Typography variant='caption'>
                {theme.palette.secondary.dark}
              </Typography>
            </Box>
          </Grid>

          {/* Accent and text colors */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Box
              sx={{
                bgcolor: 'accent.main',
                color: 'accent.contrastText',
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}>
              <Typography variant='subtitle2'>Accent Main</Typography>
              <Typography variant='caption'>
                {theme.palette.accent?.main}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'text.primary',
                color: 'background.paper',
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}>
              <Typography variant='subtitle2'>Text Primary</Typography>
              <Typography variant='caption'>
                {theme.palette.text.primary}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'text.secondary',
                color: 'background.paper',
                p: 2,
                borderRadius: 1,
              }}>
              <Typography variant='subtitle2'>Text Secondary</Typography>
              <Typography variant='caption'>
                {theme.palette.text.secondary}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Buttons Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Buttons
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={2}>
          {/* Contained buttons */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Contained Buttons
            </Typography>
            <Box sx={{ '& > button': { m: 1 } }}>
              <Button
                variant='contained'
                color='primary'>
                Primary
              </Button>
              <Button
                variant='contained'
                color='secondary'>
                Secondary
              </Button>
              <Button
                variant='contained'
                color='error'>
                Error
              </Button>
              <Button
                variant='contained'
                color='warning'>
                Warning
              </Button>
              <Button
                variant='contained'
                color='info'>
                Info
              </Button>
              <Button
                variant='contained'
                color='success'>
                Success
              </Button>
              <Button
                variant='contained'
                disabled>
                Disabled
              </Button>
              <Button variant='accent'>Accent</Button>
            </Box>
          </Grid>

          {/* Outlined buttons */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Outlined Buttons
            </Typography>
            <Box sx={{ '& > button': { m: 1 } }}>
              <Button
                variant='outlined'
                color='primary'>
                Primary
              </Button>
              <Button
                variant='outlined'
                color='secondary'>
                Secondary
              </Button>
              <Button
                variant='outlined'
                color='error'>
                Error
              </Button>
              <Button
                variant='outlined'
                color='warning'>
                Warning
              </Button>
              <Button
                variant='outlined'
                color='info'>
                Info
              </Button>
              <Button
                variant='outlined'
                color='success'>
                Success
              </Button>
              <Button
                variant='outlined'
                disabled>
                Disabled
              </Button>
            </Box>
          </Grid>

          {/* Text buttons */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Text Buttons
            </Typography>
            <Box sx={{ '& > button': { m: 1 } }}>
              <Button
                variant='text'
                color='primary'>
                Primary
              </Button>
              <Button
                variant='text'
                color='secondary'>
                Secondary
              </Button>
              <Button
                variant='text'
                color='error'>
                Error
              </Button>
              <Button
                variant='text'
                color='warning'>
                Warning
              </Button>
              <Button
                variant='text'
                color='info'>
                Info
              </Button>
              <Button
                variant='text'
                color='success'>
                Success
              </Button>
              <Button
                variant='text'
                disabled>
                Disabled
              </Button>
            </Box>
          </Grid>

          {/* Button sizes */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Button Sizes
            </Typography>
            <Box sx={{ '& > button': { m: 1 } }}>
              <Button
                variant='contained'
                color='primary'
                size='small'>
                Small
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='medium'>
                Medium
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='large'>
                Large
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Form Elements Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Form Elements
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}>
          {/* Text Fields */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Text Fields
            </Typography>
            <Box sx={{ '& > *': { mb: 2 } }}>
              <TextField
                fullWidth
                label='Standard'
                variant='outlined'
              />
              <TextField
                fullWidth
                label='Filled'
                variant='filled'
              />
              <TextField
                fullWidth
                label='Standard'
                variant='standard'
              />
              <TextField
                fullWidth
                label='With Helper Text'
                variant='outlined'
                helperText='Some helper text'
              />
              <TextField
                fullWidth
                label='With Error'
                variant='outlined'
                error
                helperText='Error message'
              />
              <TextField
                fullWidth
                label='Disabled'
                variant='outlined'
                disabled
              />
              <TextField
                fullWidth
                label='Password'
                type='password'
                variant='outlined'
              />
              <TextField
                fullWidth
                label='Multiline'
                multiline
                rows={4}
                variant='outlined'
              />
            </Box>
          </Grid>

          {/* Selection Controls */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Selection Controls
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle2'
                gutterBottom>
                Checkboxes
              </Typography>
              <Box>
                <Checkbox defaultChecked />
                <Checkbox />
                <Checkbox disabled />
                <Checkbox
                  disabled
                  checked
                />
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle2'
                gutterBottom>
                Radio Buttons
              </Typography>
              <Box>
                <Radio defaultChecked />
                <Radio />
                <Radio disabled />
                <Radio
                  disabled
                  checked
                />
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle2'
                gutterBottom>
                Switches
              </Typography>
              <Box>
                <Switch defaultChecked />
                <Switch />
                <Switch disabled />
                <Switch
                  disabled
                  checked
                />
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle2'
                gutterBottom>
                Sliders
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider defaultValue={30} />
                <Slider
                  defaultValue={30}
                  color='secondary'
                />
                <Slider
                  disabled
                  defaultValue={30}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Cards Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Cards
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}>
          {/* Basic Card */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant='h5'
                  component='div'
                  gutterBottom>
                  Basic Card
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'>
                  This is a basic card with some content. Cards can contain
                  text, images, and other UI elements.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Card with Actions */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant='h5'
                  component='div'
                  gutterBottom>
                  Card with Actions
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'>
                  This card has multiple action buttons to demonstrate different
                  button styles within a card.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  variant='text'>
                  Cancel
                </Button>
                <Button
                  size='small'
                  variant='contained'>
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Outlined Card */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Card variant='outlined'>
              <CardContent>
                <Typography
                  variant='h5'
                  component='div'
                  gutterBottom>
                  Outlined Card
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'>
                  This is an outlined card variant which has a more subtle
                  appearance compared to the default card.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  variant='outlined'>
                  Action
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Feedback Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Feedback Components
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}>
          {/* Alerts */}
          <Grid
            item
            xs={12}>
            <Typography
              variant='h6'
              gutterBottom>
              Alerts
            </Typography>
            <Alert
              severity='error'
              sx={{ mb: 2 }}>
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
            <Alert
              severity='warning'
              sx={{ mb: 2 }}>
              <AlertTitle>Warning</AlertTitle>
              This is a warning alert — <strong>check it out!</strong>
            </Alert>
            <Alert
              severity='info'
              sx={{ mb: 2 }}>
              <AlertTitle>Info</AlertTitle>
              This is an info alert — <strong>check it out!</strong>
            </Alert>
            <Alert
              severity='success'
              sx={{ mb: 2 }}>
              <AlertTitle>Success</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          </Grid>

          {/* Progress */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Progress Indicators
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle2'
                gutterBottom>
                Circular Progress
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CircularProgress />
                <CircularProgress color='secondary' />
                <CircularProgress color='success' />
                <CircularProgress color='error' />
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle2'
                gutterBottom>
                Linear Progress
              </Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress sx={{ mb: 1 }} />
                <LinearProgress
                  color='secondary'
                  sx={{ mb: 1 }}
                />
                <LinearProgress
                  color='success'
                  sx={{ mb: 1 }}
                />
                <LinearProgress
                  color='error'
                  sx={{ mb: 1 }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Chips */}
          <Grid
            item
            xs={12}
            sm={6}>
            <Typography
              variant='h6'
              gutterBottom>
              Chips
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label='Basic' />
              <Chip
                label='Primary'
                color='primary'
              />
              <Chip
                label='Secondary'
                color='secondary'
              />
              <Chip
                label='Success'
                color='success'
              />
              <Chip
                label='Error'
                color='error'
              />
              <Chip
                label='Warning'
                color='warning'
              />
              <Chip
                label='Info'
                color='info'
              />
              <Chip
                label='Clickable'
                onClick={() => {}}
              />
              <Chip
                label='Deletable'
                onDelete={() => {}}
              />
              <Chip
                icon={<StarIcon />}
                label='With Icon'
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Navigation Components */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Navigation Components
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Tabs */}
        <Typography
          variant='h6'
          gutterBottom>
          Tabs
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label='basic tabs example'>
            <Tab label='Tab One' />
            <Tab label='Tab Two' />
            <Tab label='Tab Three' />
          </Tabs>
        </Box>
        <Box sx={{ p: 2, mb: 3 }}>
          {tabValue === 0 && (
            <Typography>
              Content for Tab One. This is the first tab panel.
            </Typography>
          )}
          {tabValue === 1 && (
            <Typography>
              Content for Tab Two. This is the second tab panel.
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography>
              Content for Tab Three. This is the third tab panel.
            </Typography>
          )}
        </Box>

        {/* Lists */}
        <Typography
          variant='h6'
          gutterBottom>
          Lists
        </Typography>
        <Grid
          container
          spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}>
            <List
              component={Paper}
              sx={{ mb: 3 }}>
              <ListItem>
                <ListItemText primary='Single-line item' />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary='Single-line item' />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary='Single-line item' />
              </ListItem>
            </List>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}>
            <List
              component={Paper}
              sx={{ mb: 3 }}>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Item with icon' />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Item with icon'
                  secondary='Secondary text'
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary='Item with icon' />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Accordions */}
        <Typography
          variant='h6'
          gutterBottom>
          Accordions
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'>
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'>
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disabled>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'>
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion>
        </Box>
      </Paper>

      {/* Status Icons */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Status Icons
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={6}
            sm={3}
            md={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <CheckCircleIcon
                color='success'
                sx={{ fontSize: 40, mb: 1 }}
              />
              <Typography variant='body2'>Success</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <InfoIcon
                color='info'
                sx={{ fontSize: 40, mb: 1 }}
              />
              <Typography variant='body2'>Info</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <WarningIcon
                color='warning'
                sx={{ fontSize: 40, mb: 1 }}
              />
              <Typography variant='body2'>Warning</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <ErrorIcon
                color='error'
                sx={{ fontSize: 40, mb: 1 }}
              />
              <Typography variant='body2'>Error</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Theme Information */}
      <Paper sx={{ p: 3 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Theme Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography
          variant='body1'
          paragraph>
          This theme is designed to provide a consistent and modern look and
          feel across the application. It's based on Material-UI's theming
          system with custom colors, typography, and component styles.
        </Typography>

        <Typography
          variant='body1'
          paragraph>
          The primary color is{' '}
          <Box
            component='span'
            sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {theme.palette.primary.main}
          </Box>
          , the secondary color is{' '}
          <Box
            component='span'
            sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
            {theme.palette.secondary.main}
          </Box>
          , and the accent color is{' '}
          <Box
            component='span'
            sx={{ color: 'accent.main', fontWeight: 'bold' }}>
            {theme.palette.accent?.main}
          </Box>
          .
        </Typography>

        <Typography variant='body1'>
          The font family used throughout the application is:{' '}
          <Box
            component='span'
            sx={{ fontWeight: 'bold' }}>
            {theme.typography.fontFamily}
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ThemeShowcase;
