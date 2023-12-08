import React from "react";
import Pagination from "@mui/material/Pagination";

import { useSubmit, useLocation } from "react-router-dom";

const Paginate = (props) => {
  const currentPage = props.meta.current_page;
  const totalItems = props.meta.total;
  const itemsPerPage = props.meta.per_page;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const submit = useSubmit();
  const location = useLocation();
  const searchExists = new URLSearchParams(location.search).has("search");
  const paginateHandler = (event, page) => {
    let url = `page=${page}`;
    if (searchExists) {
      const searchParam = new URLSearchParams(location.search).get("search");
      url += `&search=${searchParam}`;
    }

    submit(url);
  };
  return (
    <div>
      <Pagination
        count={totalPages}
        variant="text"
        onChange={paginateHandler}
        page={currentPage}
      />
    </div>
  );
};

export default Paginate;
