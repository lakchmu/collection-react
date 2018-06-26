/* global Headers, fetch */

import { API_END_POINT, API_METHOD_SERIES, API_METHOD_COUNT } from './constants';

function getResponse(response) {
  if (response.ok === false) {
    throw new Error(`Fetch: response.ok is ${response.ok}, response.status is ${response.status}`);
  }
  return response;
}

function request(url, options) {
  const headers = new Headers();
  const initOptions = {
    headers,
    method: options.method,
    mode: 'cors',
    cache: 'default',
  };
  if (options.body) {
    initOptions.body = options.body;
  }

  return fetch(API_END_POINT + url, initOptions)
    .then(getResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}

function getSeries() {
  return request(API_METHOD_SERIES, { method: 'get' })
    .then(response => response.json())
    .catch((error) => {
      throw new Error(error.message);
    });
}

function getCountInfo() {
  return request(API_METHOD_COUNT, { method: 'get' })
    .then(response => response.json())
    .catch((error) => {
      throw new Error(error.message);
    });
}

function getJson(API_METHOD) {
  return request(API_METHOD, { method: 'get' })
    .then(response => response.json())
    .catch((error) => {
      throw new Error(error.message);
    });
}

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

export default request;
export { getResponse, getSeries, getCountInfo, getJson, deepCopy };
