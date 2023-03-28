import { useRef, useState } from 'react';
import { login, register } from '../controllers/Login';
import FormButton from '../components/FormButton';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.page}>
      <div className={styles.form} style={{ display: isLogin ? 'flex' : 'none' }}>
        <h2>Bem-Vindo !</h2>
        <TextInput label="Login" name="login" placeholder="Digite seu login" inputRef={usernameRef} />
        <TextInput label="Senha" name="password" placeholder="Digite sua senha" inputRef={passwordRef} isPassword />
        <FormButton label="Entrar" onClick={() => login(usernameRef, passwordRef)} />
        <div onClick={() => setIsLogin(false)} role="none">fazer registro</div>
        { /* todo: social media */ }
      </div>

      <div className={styles.form} style={{ display: isLogin ? 'none' : 'flex' }}>
        <h2>Cadastrar</h2>
        <div style={{display:'none'}}><TextInput label="Nome" name="name" placeholder="Digite seu nome" inputRef={nameRef} /></div>
        <TextInput label="Usuário" name="username" placeholder="meuNick" inputRef={usernameRef} />
        <div style={{display:'none'}}><TextInput label="Email" name="email" placeholder="pessoa@dominio.com" inputRef={emailRef} /></div>
        <TextInput label="Senha" name="password" placeholder="Digite sua senha" inputRef={passwordRef} isPassword />
        <FormButton label="Cadastrar" onClick={() => register(nameRef, usernameRef, emailRef, passwordRef)} />
        <div onClick={() => setIsLogin(true)} role="none">fazer login</div>
        { /* todo: social media */ }
      </div>
      <div style={{ height: 80 }}> </div>
    </div>
  );
}
