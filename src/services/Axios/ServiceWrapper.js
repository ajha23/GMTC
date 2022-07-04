import axiosInstance from "./Axios";

export const fetchApiInformation = (options) => {
  return {
    method: options.method ? options.method : "GET",
    url: options.url,
    params: options.params,
    data: options.data,
  };
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;

    return Promise.reject(error);
  }
};

export const request = (options) => {
  const onSucess = (response) => response.data;
  const onError = (error) => {
    console.error("Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return axiosInstance(fetchApiInformation(options))
    .then(checkStatus)
    .then(onSucess)
    .catch(onError);
};
