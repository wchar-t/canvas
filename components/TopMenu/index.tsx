import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Api from '../../lib/api';
import styles from '../../styles/components/TopMenu.module.css';
import Icon from '../Icon';

export default function TopMenu() {
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const localSession = Api.getLocalSession();

  function openProfileMenu() {
    profileButtonRef.current?.classList.add(styles.active);
  }

  function closeProfileMenu() {
    // hacky but works
    setTimeout(() => profileButtonRef.current?.classList.remove(styles.active), 100);
  }

  useEffect(() => {
    profileButtonRef.current?.addEventListener('focus', openProfileMenu);
    profileButtonRef.current?.addEventListener('blur', closeProfileMenu);

    return () => {
      profileButtonRef.current?.removeEventListener('focus', openProfileMenu);
      profileButtonRef.current?.removeEventListener('blur', closeProfileMenu);
    }
  }, []);

  return (
    <nav className={styles.menu}>
      <div style={{ width: '100%' }}> </div>
      <button className={styles.profile} type="button" ref={profileButtonRef}>
        <div className={styles.pp}>
          <img src={localSession?.profile.image} />
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{localSession?.profile.name}</span>
          <span className={styles.email}>{localSession?.email}</span>
        </div>
        <Icon name="angle-down" />
        <ul>
          <li>
            <Link href="/">
              <div className={styles.icon}>
                <Icon name="home" />
              </div>
              Início
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <div className={styles.icon}>
                <Icon name="gear" />
              </div>
              Configurações
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <div className={styles.icon}>
                <Icon name="reply" />
              </div>
              Logout
            </Link>
          </li>
        </ul>
      </button>
    </nav>
  );
}
