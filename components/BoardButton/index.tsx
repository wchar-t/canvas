import styles from '../../styles/components/BoardButton.module.css';

interface BoardButtonOptions {
  label: string | JSX.Element,
  isActive?: boolean,
  onClick: () => void
}

export default function BoardButton({ label, onClick, isActive = false }: BoardButtonOptions) {
  return (
    <button type="button" className={`${styles.button} ${isActive ? styles.active : ''}`} onClick={onClick}>
      {label}
    </button>
  );
}

export { styles };
