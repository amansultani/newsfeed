import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import { useRouteLoaderData, useSubmit, useNavigation } from "react-router-dom";

const CategoryPreference = () => {
  const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const allCategories = useRouteLoaderData("category-loader");
  const submit = useSubmit();
  const categories = allCategories.response.data.categories;
  const userCategories = allCategories.response.data.userCategories;
  const navigation = useNavigation();

  const [checkedCategories, setCheckedCategories] = React.useState([]);
  React.useEffect(() => {
    setCheckedCategories(userCategories.map((category) => category.id));
  }, []);

  const handleCheckboxChange = (categoryId) => {
    setCheckedCategories((prevChecked) => {
      if (prevChecked.includes(categoryId)) {
        return prevChecked.filter((id) => id !== categoryId);
      } else {
        return [...prevChecked, categoryId];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (checkedCategories.length === categories.length) {
      setCheckedCategories([]);
    } else {
      setCheckedCategories(categories.map((category) => category.id));
    }
  };

  const submitHandler = () => {
    submit(
      { category_preferences: checkedCategories },
      {
        method: "put",
        encType: "application/json",
      }
    );
    setSuccess(true);
  };

  return (
    <>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Choose your preferred article category from the available sources.
      </Typography>
      <FormControlLabel
        label="Select All"
        control={
          <Checkbox
            checked={checkedCategories.length === categories.length}
            onChange={handleSelectAllChange}
          />
        }
      />
      <Stack sx={{ marginLeft: 2 }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category.id}
            label={category.name}
            control={
              <Checkbox
                checked={checkedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              />
            }
          />
        ))}
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={navigation.state === "submitting"}
            onClick={submitHandler}
          >
            Save Changes
          </Button>
          {navigation.state === "submitting" && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab
            aria-label="save"
            color="primary"
            sx={buttonSx}
            onClick={submitHandler}
          >
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {navigation.state === "submitting" && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default CategoryPreference;
