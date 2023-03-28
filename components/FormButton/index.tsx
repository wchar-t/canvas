import styles from '../../styles/components/FormButton.module.css';

interface FormButtonOptions {
  label: string | JSX.Element,
  theme?: 'tertiary',
  onClick: () => void,
}

export default function FormButton({ label, theme, onClick }: FormButtonOptions) {
  return (
    <button type="button" className={`${styles.button} ${theme === 'tertiary' ? styles.tertiary : undefined}`} onClick={onClick}>
      {label}
    </button>
  );
}
