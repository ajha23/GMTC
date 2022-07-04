import React, { Fragment, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Form from "../../commons/UI/Form/Form";
import { Drawer } from "@mui/material";

const Edit = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <GridActionsCellItem
        icon={
          <EditIcon
            style={
              props.row.status === "MANUAL"
                ? {}
                : { opacity: 0.5, cursor: "not-allowed" }
            }
            color="warning"
          />
        }
        label="Edit"
        onClick={handleOpen}
      />
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Form {...props} onDrawerClose={handleClose} />
      </Drawer>
    </Fragment>
  );
};

export default Edit;
