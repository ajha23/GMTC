import * as actionTypes from "../actionTypes";
import { updateObject } from "../../commons/utility/Utility";

const initialState = {
  transactions: [],
  isLoading: false,
  transactionDetail: null,
  alert: null,
};

const addAlert = (state, action) => {
  return updateObject(state, { alert: action.data });
};

const removeAlert = (state, action) => {
  return updateObject(state, { alert: null });
};
const requestTransaction = (state, action) => {
  return updateObject(state, { isLoading: true });
};

const receivedAllTransactions = (state, action) => {
  return updateObject(state, {
    ...state,
    transactions: action.data,
    isLoading: false,
  });
};

const receivedTransactionDetail = (state, action) => {
  return updateObject(state, {
    ...state,
    transactionDetail: action.data,
    isLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_TRANSACTION:
      return requestTransaction(state, action);
    case actionTypes.RECEIVED_ALL_TRANSACTIONS:
      return receivedAllTransactions(state, action);
    case actionTypes.RECEIVED_TRANSACTION_DETAIL:
      return receivedTransactionDetail(state, action);
    case actionTypes.ADD_ALERT:
      return addAlert(state, action);
    case actionTypes.REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
};

export default reducer;
