import styles from '../../styles/components/SideSettingsMenu.module.css';

interface SideSettingsMenuContentProps {
  title: string,
  identifier: string,
  isActive?: boolean,
  isRow?: boolean,
  children: any | any[],
}

export default function SideSettingsMenuContent({
  title, identifier, isActive = false, isRow = false, children,
}: SideSettingsMenuContentProps) {
  return (
    <div data-for={`side-settings-menu-content-${identifier}`} className={`${isActive ? styles.active : undefined} ${isRow ? styles.row : undefined}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles['content-separator']}> </div>
      <div className={styles.settings}>
        {children}
      </div>
    </div>
  );
}
