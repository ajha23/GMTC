import { request } from "../../services/Axios/ServiceWrapper";
import * as actionTypes from "../actionTypes";
import * as ENDPOINTS from "../../services/Api";
import { alertType } from "../constant";

export const addAlert = (alertType, alertMessage) => {
  return {
    type: actionTypes.ADD_ALERT,
    data: { alertType, alertMessage },
  };
};

export const removeAlert = () => {
  return {
    type: actionTypes.REMOVE_ALERT,
  };
};

const requestTransaction = () => {
  return {
    type: actionTypes.REQUEST_TRANSACTION,
  };
};

export const receivedAllTransactions = (data) => {
  return {
    type: actionTypes.RECEIVED_ALL_TRANSACTIONS,
    data,
  };
};

const receivedTransactionDetail = (data) => {
  return {
    type: actionTypes.RECEIVED_TRANSACTION_DETAIL,
    data,
  };
};

export const getAllTransactions = () => {
  return async (dispatch) => {
    dispatch(requestTransaction());

    return request({
      url: ENDPOINTS.TRANSACTIONS,
    })
      .then((res) => {
        dispatch(receivedAllTransactions(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addNewTransactions = (data) => {
  return async (dispatch) => {
    return request({
      url: ENDPOINTS.TRANSACTIONS,
      method: "POST",
      data: {
        amount: data.amount,
        merchant: {
          name: data.merchant.name,
        },
        type: data.type,
        reference: data.reference,
        remarks: data.remarks,
      },
    })
      .then((res) => {
        dispatch(
          addAlert(
            alertType.SUCCESS,
            `Transaction submission successful with Transacion id: ${res.id}`
          )
        );
        dispatch(getAllTransactions());
      })
      .catch((err) => {
        dispatch(addAlert(alertType.ERROR, err.data));
      });
  };
};

export const getTransactionById = (id) => {
  return async (dispatch) => {
    dispatch(requestTransaction());
    return request({
      url: `${ENDPOINTS.TRANSACTIONS}/${id}`,
    })
      .then((res) => {
        dispatch(receivedTransactionDetail(res));
      })
      .catch((err) => {
        dispatch(addAlert(alertType.ERROR, err.data));
      });
  };
};

export const editTransaction = (data) => {
  return async (dispatch) => {
    return request({
      url: `${ENDPOINTS.TRANSACTIONS}/${data.id}`,
      method: "PATCH",
      params: {
        id: data.id,
      },
      data: {
        amount: data.amount,
        merchant: {
          name: data.merchant.name,
        },
        type: data.type,
        reference: data.reference,
        remarks: data.remarks,
      },
    })
      .then((res) => {
        dispatch(
          addAlert(alertType.SUCCESS, `Transaction ${res.id} saved successfully`)
        );
        dispatch(getAllTransactions());
      })
      .catch((err) => {
        dispatch(addAlert(alertType.ERROR, err.data));
      });
  };
};

export const deleteTransaction = (id) => {
  return async (dispatch) => {
    return request({
      url: `${ENDPOINTS.TRANSACTIONS}/${id}`,
      method: "delete",
      params: {
        id,
      },
    })
      .then((res) => {
        dispatch(addAlert(alertType.SUCCESS, res));
        dispatch(getAllTransactions());
      })
      .catch((err) => {
        dispatch(addAlert(alertType.ERROR, err.data));
      });
  };
};
