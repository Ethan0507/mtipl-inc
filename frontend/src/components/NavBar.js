import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import { AuthContext } from "../utils/context/auth-context";
import { useContext } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

const pages = [
  {
    label: 'About Us',
    href: "about"
  },{
    label: 'Services',
    href: "services"
  }, {
    label: 'How we work',
    href: "how-we-work"
  },
  {
    label: 'Alliances',
    href: 'alliances'
  },{
    label: 'Contact us',
    href: 'contact'
  }
];

const ResponsiveAppBar = (props) => {

  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGoToStore = () => {
    if (auth.isLoggedIn) {
      navigate("/store");
    } else {
      navigate("/login");
    }
  }

  const handleLogout = () => {
    handleCloseUserMenu();
    auth.logout();
    // navigate("/login");
    console.log(auth);
  };

  const settings = [{
    label: 'Profile',
    helper: handleCloseUserMenu
  },
  {
    label: 'Account',
    helper: handleCloseUserMenu
  },
  {
    label: 'Dashboard',
    helper: handleCloseUserMenu
  },
  {
    label:'Logout',
    helper: handleLogout
  }];


  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/" underline="none">
              <img
                src="logo.jpeg"
                alt="MTIPL Inc."
                style={{
                  maxHeight: "75px",
                  maxWidth: "75px",
                  display: "block"
                }}
              />
            </Link>
            
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => { handleCloseNavMenu(); window.location.href = "#"+page.href; }}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img
              src="transparent-white-logo.png"
              alt="MTIPL Inc."
              style={{
                maxHeight: "75px",
                maxWidth: "150px",
                display: "block"
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => { handleCloseNavMenu(); window.location.href = "#"+page.href; }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {auth.isLoggedIn && location.pathname === "/store" ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="avatar_1.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.helper}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          :
          <Button variant="contained" color="secondary" onClick={handleGoToStore} sx={{ px: 2, py: 1 }} style={{ color: "#fff" }}>
            Go to store
          </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
