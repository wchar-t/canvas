import FormButton from '../components/FormButton';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Bem-Vindo !</h2>
        <TextInput label="Login" name="login" placeholder="Digite seu login" />
        <TextInput label="Senha" name="password" placeholder="Digite sua senha" isPassword />
        <FormButton label="Entrar" onClick={() => {}} />
        { /* todo: social media */ }
      </div>
      <div style={{ height: 80 }}> </div>
    </div>
  );
}
