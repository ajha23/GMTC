import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../../../store/transactions/action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.transactions);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(removeAlert());
  };

  return (
    <Snackbar open={!!alert} autoHideDuration={6000} onClose={handleClose}>
      {!!alert ? (
        <Alert
          onClose={handleClose}
          severity={alert.alertType}
          sx={{ width: "100%" }}
        >
          {alert.alertMessage}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default Toast;
