import styles from '../../styles/components/FormButton.module.css';

interface FormButtonOptions {
  label: string,
  onClick: () => void,
}

export default function FormButton({ label, onClick }: FormButtonOptions) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}
