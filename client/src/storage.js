import {
  API_METHOD_SERIES,
  API_METHOD_FIGURINE,
  API_METHOD_FIGURINES_BY_YEAR,
  API_METHOD_PHOTO_FIGURINE,
  API_METHOD_FEATURES,
  API_METHOD_YEARS,
  API_METHOD_GENERAL_INFO,
  API_METHOD_COUNT,
} from './constants';
import { getJson } from './app-lib';

export default class Storage {
  static getSerie(id) {
    return getJson(`${API_METHOD_SERIES}?id=${id}`)
      .then(response => response.results[0]);
  }

  static getSeries(options) {
    const request = options.reduce((result, option) => `${result}&${option.filter}=${option.value}`, `${API_METHOD_SERIES}?`);
    return getJson(request)
      .then(response => response.results);
  }

  static getFigurine(id) {
    return getJson(`${API_METHOD_FIGURINE}?id=${id}`)
      .then(response => response.results[0]);
  }

  static getFigurines(options) {
    const request = options.reduce((result, option) => `${result}&${option.filter}=${option.value}`, `${API_METHOD_FIGURINE}?`);
    return getJson(request)
      .then(response => response.results);
  }

  static getFigurinesByYear() {
    return getJson(API_METHOD_FIGURINES_BY_YEAR)
      .then(response => response.data_list);
  }

  static getPhotoFigurine(figurineId) {
    return getJson(`${API_METHOD_PHOTO_FIGURINE}?figurine=${figurineId}`)
      .then(response => response.results);
  }

  static getFeatures() {
    return getJson(API_METHOD_FEATURES)
      .then(response => response.results);
  }

  static getYears() {
    return getJson(API_METHOD_YEARS)
      .then(response => response.data_list);
  }

  static getGeneralInfo() {
    return getJson(API_METHOD_GENERAL_INFO)
      .then(response => response);
  }

  static getCountInfo() {
    return getJson(API_METHOD_COUNT)
      .then(response => response);
  }

  static getData(apiMethod, options) {
    const request = options.reduce((result, option) => `${result}&${option.filter}=${option.value}`, `${apiMethod}?`);
    return getJson(request)
      .then(response => response);
  }
}
