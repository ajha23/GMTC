import React, { Fragment, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Drawer } from "@mui/material";
import Form from "../UI/Form/Form";

const Table = (props) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({});

  const handleClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const handleOpen = (params) => {
    setParams(params);
    setOpen(true);
  };
  return (
    <Fragment>
      <DataGrid
        rows={props.data}
        columns={props.columnsConfig}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        onRowClick={(params)=>handleOpen(params)}
        style={{height:"80%"}}
      />
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Form {...props} mode="view" params={params} onDrawerClose={handleClose} />
      </Drawer>
    </Fragment>
  );
};

export default Table;
