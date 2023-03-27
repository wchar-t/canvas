import { useRef } from 'react';
import { login } from '../controllers/Login';
import FormButton from '../components/FormButton';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Bem-Vindo !</h2>
        <TextInput label="Login" name="login" placeholder="Digite seu login" inputRef={usernameRef} />
        <TextInput label="Senha" name="password" placeholder="Digite sua senha" inputRef={passwordRef} isPassword />
        <FormButton label="Entrar" onClick={() => login(usernameRef, passwordRef)} />
        { /* todo: social media */ }
      </div>
      <div style={{ height: 80 }}> </div>
    </div>
  );
}
