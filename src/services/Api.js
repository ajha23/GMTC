export const BASE_URL = "https://psl-mock-api.herokuapp.com";

const ENDPOINTS = {
  transactions: {
    actual: "/transactions",
  },
};

export const TRANSACTIONS = BASE_URL + ENDPOINTS.transactions.actual;
