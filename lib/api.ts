import { Session } from '../interfaces/shared/session';
import LoginSuccess from '../interfaces/client/LoginSuccess';
import RegisterSuccess from '../interfaces/client/RegisterSuccess';
import Board from '../interfaces/shared/board';

/* eslint-disable no-undef */
export interface SuccessfulResponse<Data extends Record<string, any>> {
  error: false,
  result: Data,
}

export interface ErrorResponse {
  error: {
    code: string,
    message: string,
  },
  result: null,
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
    return <ErrorResponse>{ error: { code: error.code, message: error.message } };
  }

  return <SuccessfulResponse<Data>>{ result };
};

export default class Api {
  static async login(username: string, password: string): Promise<RequestResponse<LoginSuccess>> {
    return request<LoginSuccess>('/api/login', { username, password });
  }

  static async register(name: string, username: string, email: string, password: string): Promise<RequestResponse<RegisterSuccess>> {
    return request<RegisterSuccess>('/api/register', { name, username, email, password });
  }

  static async logout() {
    localStorage.setItem('token', '');
  }

  // Rotas privadas

  static async me(): Promise<RequestResponse<Session>> {
    return request('/api/me');
  }

  static async createBoard(): Promise<RequestResponse<Board>> {
    return request('/api/board/create');
  }

  static async getBoard(id: string): Promise<RequestResponse<Board>> {
    return request(`/api/board/${id}`);
  }

  static async saveBoard(id: string, data?: any): Promise<RequestResponse<Board>> {
    return request(`/api/board/${id}`, { data });
  }

  // Local

  static getLocalSession(): Session | null {
    if (typeof localStorage === 'undefined') return null;
    return JSON.parse(Buffer.from(localStorage.getItem('token')?.split('.')[1] || 'e30=', 'base64').toString());
  }
}
