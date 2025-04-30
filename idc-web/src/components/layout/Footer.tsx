import React from 'react';
import { Box, Typography, Container } from '@mui/material';

/**
 * Footer component
 *
 * Simple footer with copyright information.
 * Positioned at the bottom of the page.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}>
      <Container maxWidth='lg'>
        <Typography
          variant='body2'
          color='text.secondary'
          align='center'>
          {`© ${currentYear} IDC Web App. All rights reserved.`}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
