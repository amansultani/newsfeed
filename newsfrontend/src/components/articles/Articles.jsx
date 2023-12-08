import React from "react";

import Container from "@mui/material/Container";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Article from "./Article";
import LoadingIndicator1 from "../ui/LoadingIndicator1";
import Paginate from "./Paginate";

import { useLocation, json } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ApiService from "../../components/api/ApiService";
import Error from "../ui/error";
import SearchBar from "./SearchBar";

function Articles() {
  const location = useLocation();
  const path = `${location.pathname.slice(1)}${location.search}`;
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["articles", path],
    queryFn: async () => {
      const response = await ApiService.get(path);
      if (response.status !== 200) {
        throw json({ response: "Could not fetch articles." }, { status: 500 });
      } else {
        return response;
      }
    },
  });
  let content = <p></p>;
  if (isPending) content = <LoadingIndicator1 />;
  if (isError) content = <Error error={error} />;

  if (data)
    if (data.data.data.length === 0)
      content = (
        <Box display="flex" justifyContent="center" mt={5}>
          <Box>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" gutterBottom>
                Content Not Found!
              </Typography>
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Stack>
          </Box>
        </Box>
      );
    else
      content = (
        <main>
          <Grid container spacing={4}>
            {data.data.data.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </Grid>
          {data.data.meta && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Box display="inline" mt={2}>
                <Paginate meta={data.data.meta} />
              </Box>
            </Box>
          )}
        </main>
      );
  return (
    <Container maxWidth="lg">
      <SearchBar />
      {content}
    </Container>
  );
}

export default Articles;
