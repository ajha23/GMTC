import React from "react";
import { useDispatch } from "react-redux";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTransaction } from "../../store/transactions/action";

const Delete = ({ id, row }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteTransaction(id));
  };
  return (
    <GridActionsCellItem
      icon={
        <DeleteIcon
          style={
            row.status === "MANUAL"
              ? {}
              : { opacity: 0.5, cursor: "not-allowed" }
          }
          color="error"
        />
      }
      label="Delete"
      onClick={handleClick}
    />
  );
};

export default Delete;
