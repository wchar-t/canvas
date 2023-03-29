import { RefObject } from 'react';
import styles from '../styles/components/TextInput.module.css';
import Api from '../lib/api';

export async function login(
  usernameRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>,
): Promise<boolean> {
  if (!usernameRef.current || !passwordRef.current) return false;

  const username = usernameRef.current.value.toLowerCase().trim();
  const password = passwordRef.current.value.trim();

  const { error, result } = await Api.login(username, password);

  if (error) {
    if (error.code === 'invalid_credentials') {
      usernameRef.current.classList.add(styles.error);
      passwordRef.current.classList.add(styles.error);
    } else if (error.code === 'invalid_password') {
      usernameRef.current.classList.remove(styles.error);
      passwordRef.current.classList.add(styles.error);
    }

    return false;
  }

  usernameRef.current.classList.remove(styles.error);
  passwordRef.current.classList.remove(styles.error);

  localStorage.setItem('token', result.jwt);
  return true;
}

export async function register(
  nameRef: RefObject<HTMLInputElement>,
  usernameRef: RefObject<HTMLInputElement>,
  emailRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>,
): Promise<boolean> {
  if (!usernameRef.current || !passwordRef.current || !emailRef.current || !nameRef.current) {
    return false
  }

  const username = usernameRef.current.value.toLowerCase().trim();
  const password = passwordRef.current.value.trim();
  const name = nameRef.current.value.toLowerCase().trim();
  const email = emailRef.current.value.trim();

  const { error, result } = await Api.register(name, username, email, password);

  if (error) {
    if (error.code === 'user_already_exists') {
      usernameRef.current.classList.add(styles.error);
    }
    return false;
  }

  usernameRef.current.classList.remove(styles.error);

  localStorage.setItem('token', result.jwt);
  return true;
}

export default { login, register }
