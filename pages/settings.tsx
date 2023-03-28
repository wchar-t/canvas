import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Session } from '../interfaces/shared/session';
import { loadSession } from '../controllers/Settings';
import TopMenu from '../components/TopMenu';
import styles from '../styles/Settings.module.css';
import SideSettingsMenu from '../components/SideSettingsMenu';

export default function Settings() {
  const { push } = useRouter();
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    loadSession().then((sess) => {
      if (!sess) {
        push('/login');
      } else {
        setSession(sess);
      }
    });
  }, [push]);

  if (!session) {
    return <div> </div>; // not loaded
  }

  return (
    <>
      <TopMenu />
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <img src={session.profile.image} />
            <div>
              <span className={styles.name}>{session.profile.name}</span>
              <span className={styles.muted}>Sua conta pessoal</span>
            </div>
          </div>
          <SideSettingsMenu session={session} />
        </div>
      </div>
    </>
  );
}
