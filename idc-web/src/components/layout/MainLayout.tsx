import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Topbar from './TopBar';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';

/**
 * MainLayout component serves as the primary layout structure for the application.
 * It includes a top navigation bar, a collapsible sidebar, a main content area,
 * and a footer with copyright information.
 * The layout is responsive and adapts to different screen sizes.
 */
const MainLayout = () => {
  // State for controlling mobile sidebar visibility
  const [mobileOpen, setMobileOpen] = useState(false);
  // State for controlling desktop sidebar visibility
  const [desktopOpen, setDesktopOpen] = useState(true);
  // Width of the sidebar when open
  const drawerWidth = 240;

  /**
   * Toggles the mobile sidebar visibility
   */
  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Toggles the desktop sidebar visibility
   */
  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Top navigation bar */}
        <Topbar
          onMenuClick={handleMobileDrawerToggle}
          onDesktopMenuClick={handleDesktopDrawerToggle}
          isDesktopOpen={desktopOpen}
        />
        {/* Left sidebar navigation */}
        <LeftSidebar
          mobileOpen={mobileOpen}
          desktopOpen={desktopOpen}
          onMobileClose={handleMobileDrawerToggle}
        />
        {/* Main content area */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            // Remove the margin-left completely
            marginLeft: '0 !important',
            // Set the width to 100% to fill the available space
            width: '100%',
            // Use a class name to help with debugging
            className: 'main-content-area',
          }}>
          {/* Toolbar spacer to push content below the app bar */}
          <Toolbar />
          {/* Render the current route's component */}
          <Outlet />
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
