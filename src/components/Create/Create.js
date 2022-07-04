import React, { Fragment, useState } from "react";
import { Button, Drawer } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Form from "../../commons/UI/Form/Form";

const Create = () => {
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
      <Button
        startIcon={<AddOutlinedIcon />}
        variant="contained"
        onClick={handleOpen}
      >
        Add New Transaction
      </Button>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Form mode="create" onDrawerClose={handleClose} />
      </Drawer>
    </Fragment>
  );
};

export default Create;
