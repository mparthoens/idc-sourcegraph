import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import LeftSidebar from './LeftSidebar';

/**
 * MainLayout component serves as the primary layout structure for the application.
 * It includes a top navigation bar, a collapsible sidebar, and a main content area.
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
    <Box sx={{ display: 'flex' }}>
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
          width: { md: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          marginLeft: { md: desktopOpen ? `${drawerWidth}px` : 0 },
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}>
        {/* Toolbar spacer to push content below the app bar */}
        <Toolbar />

        {/* Render the current route's component */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
