import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink, useSubmit } from "react-router-dom";

function Header(props) {
  const submit = useSubmit();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar
        color="primary"
        position="sticky"
        elevation={3}
        sx={{ height: "56px" }}
      >
        <Toolbar>
          <NewspaperIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, width: "15%" }}
          >
            Latest News
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <NavLink
                to={"/setting/account"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={handleClose}>Account</MenuItem>
              </NavLink>
              <MenuItem
                onClick={() =>
                  submit(null, { method: "post", action: "/logout" })
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
