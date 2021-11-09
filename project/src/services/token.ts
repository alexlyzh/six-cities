const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

type Token = string | undefined;

const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token: Token): void => {
  token && localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export {getToken, saveToken, dropToken, AUTH_TOKEN_KEY_NAME};
export type {Token};
