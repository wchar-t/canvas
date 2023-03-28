import { LegacyRef } from 'react';
import styles from '../../styles/components/TextInput.module.css';

interface TextInputOptions {
    label?: string,
    placeholder?: string,
    name: string,
    isPassword?: boolean,
    isMultiline?: boolean,
    defaultValue?: string,
    inputRef?: LegacyRef<HTMLInputElement | HTMLTextAreaElement>,
}

export default function TextInput({
  label = '', placeholder, name, isPassword = false, isMultiline = false, inputRef, defaultValue,
}: TextInputOptions) {
  return (
    <div>
      <div className={styles.label}>{label}</div>
      {
        isMultiline
          ? (
            <textarea
              defaultValue={defaultValue}
              placeholder={placeholder}
              name={name}
              className={styles.input}
              style={{ height: '130px' }}
              ref={inputRef as LegacyRef<HTMLTextAreaElement>}
            />
          )
          : (
            <input
              defaultValue={defaultValue}
              type={isPassword ? 'password' : 'text'}
              placeholder={placeholder}
              name={name}
              className={styles.input}
              autoComplete="off"
              ref={inputRef as LegacyRef<HTMLInputElement>}
            />
          )
      }
    </div>
  );
}
