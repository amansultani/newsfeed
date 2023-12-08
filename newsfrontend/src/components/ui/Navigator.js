import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
//-----------------------
import BusinessIcon from "@mui/icons-material/Business";
import AttractionsIcon from "@mui/icons-material/Attractions";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ScienceIcon from "@mui/icons-material/Science";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import ComputerIcon from "@mui/icons-material/Computer";
import CategoryIcon from "@mui/icons-material/Category";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import PublicIcon from "@mui/icons-material/Public";

import { useRouteLoaderData } from "react-router-dom";
import { NavLink as RouterLink } from "react-router-dom";
const getCategoryIcon = (categoryName) => {
  switch (categoryName.toLowerCase()) {
    case "business":
      return <BusinessIcon />;
    case "entertainment":
      return <AttractionsIcon />;
    case "general":
      return <PublicIcon />;
    case "health":
      return <HealthAndSafetyIcon />;
    case "sports":
      return <SportsMartialArtsIcon />;
    case "technology":
      return <ComputerIcon />;
    case "science":
      return <ScienceIcon />;
    default:
      return <AllInclusiveIcon />;
  }
};
const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const categoriesList = useRouteLoaderData("category-loader");
  const UserCategories = categoriesList.response.data.userCategories;
  const UserCategoriesWithIcons = UserCategories.map((category) => ({
    ...category,
    icon: getCategoryIcon(category.name),
  }));
  // console.log(UserCategoriesWithIcons);
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
          }}
        >
          Menu
        </ListItem>

        <RouterLink to={"/"} key="home" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <ListItem sx={{ ...item, ...itemCategory }}>
              <ListItemButton sx={item} selected={isActive ? true : false}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </RouterLink>
        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>
              Article Categoreis
            </ListItemText>
          </ListItem>

          {UserCategoriesWithIcons.map(({ id, name, icon }) => (
            <RouterLink
              to={`categories/${id}/news`}
              key={name}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive ? true : false} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </RouterLink>
          ))}
          <Divider sx={{ mt: 2 }} />
        </Box>
        <Box key="preferences" sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }}>User Preferences</ListItemText>
          </ListItem>
          <RouterLink
            to={"setting/preferences/categories"}
            key="category"
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton sx={item} selected={isActive ? true : false}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText>Categories </ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </RouterLink>
          <RouterLink
            to={"setting/preferences/sources"}
            key="source"
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton sx={item} selected={isActive ? true : false}>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText>Sources</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </RouterLink>
          <RouterLink
            to={"setting/account"}
            key="account"
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton sx={item} selected={isActive ? true : false}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText>Account Setting </ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </RouterLink>
          <Divider sx={{ mt: 2 }} />
        </Box>
      </List>
    </Drawer>
  );
}
