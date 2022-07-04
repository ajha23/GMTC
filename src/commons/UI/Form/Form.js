import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getTransactionById,
  addNewTransactions,
  editTransaction,
} from "../../../store/transactions/action";
import {
  getFormattedDate,
  getCategoryWithIcon,
} from "../../utility/Utility";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Form = (props) => {
  const { mode, onDrawerClose, id } = props;
  const defaultValues = {
    id: id || null,
    amount: mode === "edit" ? props.row.amount : "",
    merchant: {
      name: mode === "edit" ? props.row.merchant.name : "",
    },
    type: mode === "edit" ? props.row.type : "",
    reference: mode === "edit" ? props.row.reference : "",
    remarks: mode === "edit" ? props.row.remarks : "",
  };

  let content;
  const [state, setState] = useState(defaultValues);
  const dispatch = useDispatch();
  const { transactionDetail, isLoading } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (props.mode === "view") {
      dispatch(getTransactionById(props.params.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleMerchantInputChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      merchant: {
        ...state.merchant,
        name: value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    if (props.mode === "create") {
      dispatch(addNewTransactions(state));
    } else {
      dispatch(editTransaction(state));
    }
    onDrawerClose(event);
  };

  const handleDrawerClose = (event) => {
    onDrawerClose(event);
  };

  if (isLoading) {
    content = (
      <div className="common-spinner">
        <CircularProgress />
      </div>
    );
  }

  if (!isLoading && !!transactionDetail && props.mode === "view") {
    const {
      amount,
      datetime,
      merchant: { name, category, country },
      status,
      reference,
      remarks,
    } = transactionDetail;
    content = (
      <Fragment>
        <TextField
          id="datetime"
          name="datetime"
          label="Date & Time"
          value={getFormattedDate(datetime)}
          style={{ margin: 10 }}
        />
        <TextField
          id="merchant"
          name="merchant"
          label="Merchant"
          value={`${name}(${country})`}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {getCategoryWithIcon(category)}
              </InputAdornment>
            ),
          }}
          style={{ margin: 10 }}
        />

        <TextField
          id="amount"
          name="amount"
          label="Amount"
          type="text"
          value={amount}
          style={{ margin: 10 }}
        />
        <TextField
          id="status"
          name="status"
          label="Status"
          type="text"
          value={status}
          style={{ margin: 10 }}
        />
        <TextField
          id="reference"
          name="reference"
          label="Reference"
          type="text"
          value={reference}
          style={{ margin: 10 }}
        />
        <TextField
          id="remarks"
          name="remarks"
          label="Remarks"
          type="text"
          value={remarks}
          style={{ margin: 10 }}
        />
      </Fragment>
    );
  }

  if (props.mode !== "view") {
    const {
      amount,
      merchant: { name },
      type,
      reference,
      remarks,
    } = state;
    content = (
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="amount"
          name="amount"
          label="Amount"
          type="text"
          value={amount}
          style={{ margin: 10, width: 300 }}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="merchant"
          name="merchant"
          label="Merchant"
          value={name}
          style={{ margin: 10, width: 300 }}
          onChange={handleMerchantInputChange}
        />

        <TextField
          required
          select
          id="type"
          name="type"
          label="Type"
          type="text"
          value={type}
          style={{ margin: 10, width: 300 }}
          onChange={handleInputChange}
        >
          {[
            { label: "Debit", value: "DEBIT" },
            { label: "Credit", value: "CREDIT" },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="reference"
          name="reference"
          label="Reference"
          type="text"
          value={reference}
          style={{ margin: 10, width: 300 }}
          onChange={handleInputChange}
        />
        <TextField
          id="remarks"
          name="remarks"
          label="Remarks"
          type="text"
          value={remarks}
          style={{ margin: 10, width: 300 }}
          onChange={handleInputChange}
        />
        <div className="form-drawer-btn">
          <Button
            size="small"
            variant="contained"
            startIcon={<SendIcon />}
            type="submit"
          >
            {props.mode === "edit" ? "Save" : "Submit"}
          </Button>
          {props.mode === "edit" && (
            <Button
              size="small"
              variant="contained"
              startIcon={<CancelIcon />}
              onClick={handleDrawerClose}
              sx={{ margin: "2px" }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    );
  }
  return (
    <div className="common-form-container">
      <div className="header-container">
        <h2 className="header-name">
          {props.mode === "view"
            ? "Transaction Details"
            : props.mode === "create"
            ? "Add New Transactions"
            : "Edit Transaction"}
        </h2>
        <IconButton
          variant="outlined"
          onClick={handleDrawerClose}
          color="primary"
          aria-label="Close"
          className="form-close-btn"
          size="small"
        >
          <CloseOutlinedIcon />
        </IconButton>
      </div>

      {content}
    </div>
  );
};
export default Form;
