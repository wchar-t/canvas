import styles from '../../styles/components/SideSettingsMenu.module.css';

interface SideSetingsMenuItemOptions {
  icon: any,
  label: string,
  identifier: string,
  isActive?: boolean,
  onClick?: (identifier: string) => void,
}

export default function SideSettingsMenuItem({
  icon, label, identifier, isActive = false, onClick = () => {},
}: SideSetingsMenuItemOptions) {
  return (
    <li className={isActive ? styles.active : undefined} onClick={() => onClick(identifier)} data-for={`side-settings-menu-content-${identifier}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
    </li>
  );
}
