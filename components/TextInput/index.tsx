import styles from '../../styles/components/TextInput.module.css';

interface TextInputOptions {
    label: string,
    placeholder?: string,
    name: string,
    isPassword?: boolean,
}

export default function TextInput({
  label, placeholder, name, isPassword = false,
}: TextInputOptions) {
  return (
    <div>
      <div className={styles.label}>{label}</div>
      <input type={isPassword ? 'password' : 'text'} placeholder={placeholder} name={name} className={styles.input} autoComplete="off" />
    </div>
  );
}
