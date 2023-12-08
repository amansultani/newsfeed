import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { useRef, useEffect } from "react";
import { useSubmit, useLocation } from "react-router-dom";
const SearchBar = () => {
  const searchRef = useRef();
  const location = useLocation();
  const searchExists = new URLSearchParams(location.search).has("search");

  useEffect(() => {
    if (!searchExists) searchRef.current.value = "";
  }, [location.pathname]);
  const submit = useSubmit();
  return (
    <Paper sx={{ margin: "auto", overflow: "hidden", marginBottom: 2 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search articles by title, description or source"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                inputRef={searchRef}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  submit("search=" + searchRef.current.value);
                }}
                sx={{ mr: 1 }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default SearchBar;
