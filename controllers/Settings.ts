import { RefObject } from 'react';
import Api from '../lib/api';
import styles from '../styles/components/SideSettingsMenu.module.css';
import textInputStyles from '../styles/components/TextInput.module.css';

export async function loadSession() {
  const { error, result } = await Api.me();

  if (error) {
    return null;
  }

  localStorage.setItem('token', result.jwt);

  return result.user;
}

export async function loadSettings() {
  // todo
}

export function onMenuItemClick(identifier: string) {
  document.querySelector(`.${styles.main}`)?.querySelectorAll(`.${styles.active}`)?.forEach((el) => {
    el.classList.remove(styles.active);
  });

  document.querySelector(`.${styles.main}`)?.querySelectorAll(`*[data-for="side-settings-menu-content-${identifier}"]`)?.forEach((el) => {
    el.classList.add(styles.active);
  });
}

export async function onPublicSaveClick(
  nameRef: RefObject<HTMLInputElement>,
  bioRef: RefObject<HTMLTextAreaElement>,
) {
  if (!nameRef.current || !bioRef.current) return;

  const name = nameRef.current.value.toLowerCase().trim();
  const bio = bioRef.current.value.trim();

  await Api.updateProfile(name, bio);
}

export async function onEmailSaveClick(
  emailRef: RefObject<HTMLInputElement>,
) {
  if (!emailRef.current) return;

  const email = emailRef.current.value.toLowerCase().trim();

  await Api.updateEmail(email);
}

export async function onPasswordSaveClick(
  passwordRef: RefObject<HTMLInputElement>,
  newPasswordRef: RefObject<HTMLInputElement>,
) {
  if (!passwordRef.current || !newPasswordRef.current) return;

  const password = passwordRef.current.value.trim();
  const newPassword = newPasswordRef.current.value.trim();

  const { error } = await Api.updatePassword(password, newPassword);

  if (error) {
    passwordRef.current.classList.add(textInputStyles.error);
  } else {
    passwordRef.current.classList.remove(textInputStyles.error);
  }
}
