import React from "react";
import Typography from "@mui/material/Typography";
import SourcePreferenceTable from "./SourcePreferenceTable";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchSources, updateSources, queryClient } from "../api/http";

const SourcePreference = () => {
  const navigate = useNavigate();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["sources"],
    queryFn: fetchSources,
  });

  const {
    mutate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: updateError,
  } = useMutation({
    mutationFn: updateSources,
    onSuccess: () => {
      refetch();
      navigate("/setting/preferences/sources");
    },
  });

  const mutateHandler = (data) => {
    mutate(data);
  };
  return (
    <>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Choose and save your preferred article source(s) from the options below.
      </Typography>
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <SourcePreferenceTable
          data={data}
          mutateData={mutateHandler}
          state={isPendingUpdate}
          isError={isErrorUpdate}
          error={updateError}
        />
      )}
    </>
  );
};

export default SourcePreference;
