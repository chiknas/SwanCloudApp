import {SWAN_SERVER_URL} from '@env';

export const getApiHeaders = () => {
  const apiKey =
    '335c54f3b6061b0b8bb1e3fdff4c771c3680caa68d1299c36fd7e08f7dcf647f';

  // TODO: api key should be something like a password and then it will be hashed here

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
