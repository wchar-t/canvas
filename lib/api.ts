import LoginSuccess from '../interfaces/client/LoginSuccess';

/* eslint-disable no-undef */
export interface SuccessfulResponse<Data extends Record<string, any>> {
  error: false,
  result: Data,
}

export interface ErrorResponse {
  error: true,
  result: string,
}

type RequestResponse<Data extends Record<string, any>> = | SuccessfulResponse<Data> | ErrorResponse;

export const request = async <Data extends Record<string, any>>(
  url: string, data?: object, options?: RequestInit,
): Promise<RequestResponse<Data>> => {
  const token = window.localStorage.getItem('token');
  const { error, result } = await window.fetch(url, {
    ...options,
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : null,
    headers: {
      ...options?.headers,
      'Content-Type': data ? 'application/json' : 'text/plain;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json());

  if (error) {
    return <ErrorResponse>{ error, result };
  }

  return <SuccessfulResponse<Data>>{ result };
};

export default class Api {
  static async login(username: string, password: string): Promise<RequestResponse<LoginSuccess>> {
    return request<LoginSuccess>('/api/login', { username, password });
  }

  static async logout() {
    localStorage.setItem('token', '');
  }

  // Rotas privadas
}