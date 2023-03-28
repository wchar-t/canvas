import Link from 'next/link';
import Api from '../../lib/api';
import styles from '../../styles/components/TopMenu.module.css';
import Icon from '../Icon';

export default function TopMenu() {
  const localSession = Api.getLocalSession();

  return (
    <nav className={styles.menu}>
      <div style={{ width: '100%' }}> </div>
      <button className={styles.profile} type="button">
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
            <Link href="/settings">
              <div className={styles.icon}>
                <Icon name="gear" />
              </div>
              Configurações
            </Link>
          </li>
        </ul>
      </button>
    </nav>
  );
}
