import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, MenuList } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import SettingsIcon from "@mui/icons-material/Settings";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Materials
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem component="a" href="/material/">
                <Typography textAlign="center">Materials</Typography>
              </MenuItem>
              <MenuItem component="a" href="/movie-table/">
                <Typography textAlign="center">
                  Mantenimiento Peliculas
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <MovieIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="p"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Materials
          </Typography>

          {/* Menu de Matenimientos */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Mantenimientos">
              <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                <Avatar variant="rounded">
                  <SettingsIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem component="a" href="/material/">
                <Typography textAlign="center">Materials</Typography>
              </MenuItem>
              <MenuItem component="a" href="/movie-table/">
                <Typography textAlign="center">
                  Mantenimiento Peliculas
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* Menu de Matenimientos */}

          {/* Menu Usuarios */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon style={{ fill: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                <MenuItem component="a" href="/user/login">
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem component="a" href="/user/create">
                  <Typography textAlign="center">Registrarse</Typography>
                </MenuItem>
              </MenuList>

              <MenuList>
                <MenuItem>
                  <Typography variant="subtitle1" gutterBottom>
                    Email usuario
                  </Typography>
                </MenuItem>
                <MenuItem color="secondary" component="a" href="/user/logout">
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          {/* Menu Usuarios */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
