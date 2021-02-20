import {SWAN_SERVER_URL} from '@env';
import jsSHA from 'jssha';

const sha256 = new jsSHA('SHA-256', 'TEXT', {encoding: 'UTF8'});
sha256.update('nikos');
const apiKey = sha256.getHash('HEX');

export const getApiHeaders = () => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return apiKey
    ? {...defaultHeaders, ...{Authorization: apiKey}}
    : defaultHeaders;
};

export const apiFetch = (path?: string): Promise<Response> => {
  return fetch(`${SWAN_SERVER_URL}${path ?? ''}`, {
    method: 'GET',
    headers: getApiHeaders(),
  });
};

export const apiPost = (path: string, body: string): Promise<Response> => {
  return fetch(`${SWAN_SERVER_URL}${path}`, {
    method: 'POST',
    headers: getApiHeaders(),
    body: body,
  });
};
