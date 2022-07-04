import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "lodash";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  receivedAllTransactions,
  getAllTransactions,
} from "../../store/transactions/action";

const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { transactions } = useSelector((state) => state.transactions);

  const handleInputChange = (event) => {
    const { value } = event.target;

    setSearchText(value);
    const filteredTxn = filter(
      transactions,
      (txn) => txn.merchant.name === value
    );
    if (filteredTxn.length > 0) {
      dispatch(receivedAllTransactions(filteredTxn));
    } else {
      dispatch(getAllTransactions());
    }
  };

  // const handleSearch = () => {
  //   const allTxn = [...transactions];
  //   const filteredTxn = filter(
  //     allTxn,
  //     (txn) => txn.merchant.name === searchText
  //   );
  //   if (filteredTxn.length > 0) {
  //     dispatch(receivedAllTransactions(filteredTxn));
  //   }
  // };

  return (
    <Paper
      component="div"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        marginBottom: 2,
        height: 36,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by Merchant Name"
        value={searchText}
        onChange={handleInputChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: "10px" }} aria-label="search" >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
