import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Session } from '../interfaces/shared/session';
import { loadSession } from '../controllers/Settings';
import TopMenu from '../components/TopMenu';
import styles from '../styles/Settings.module.css';
import SideSettingsMenu from '@/components/SideSettingsMenu';

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
            <img src="https://i.pinimg.com/736x/c7/c3/90/c7c3904ed2164988cf011e2abb9bd793.jpg" />
            <div>
              <span className={styles.name}>{session.profile.name}</span>
              <span className={styles.muted}>Sua conta pessoal</span>
            </div>
          </div>
          <SideSettingsMenu />
        </div>
      </div>
    </>
  );
}
