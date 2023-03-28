import Api from '../lib/api';
import styles from '../styles/components/SideSettingsMenu.module.css';

export async function loadSession() {
  const { error, result } = await Api.me();

  if (error) {
    return null;
  }

  return result;
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
