import { API_END_POINT, API_METHOD_SERIES } from './constants';

function getResponse(response) {
  if (response.ok === false) {
    throw new Error(`Fetch: response.ok is ${response.ok}, response.status is ${response.status}`);
  }
  return response;
}

function request(url, method) {
  const headers = new Headers();
  const initOptions = {
    method,
    headers,
    mode: 'cors',
    cache: 'default',
  };

  return fetch(API_END_POINT + url, initOptions)
    .then(getResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}

function getSeries() {
  return request(API_METHOD_SERIES, 'get')
    .then(response => response.json())
    .catch((error) => {
      throw new Error(error.message);
    });
}

export default request;
export { getResponse, getSeries };