import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import controller from '../controllers/Login';
import FormButton from '../components/FormButton';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRRef = useRef<HTMLInputElement>(null);
  const passwordRRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();

  async function login() {
    console.log(usernameRef.current);
    if ((await controller.login(usernameRef, passwordRef))) {
      push('/board/new');
    }
  }

  async function register() {
    if ((await controller.register(nameRef, usernameRRef, emailRef, passwordRRef))) {
      push('/settings');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.form} style={{ display: isLogin ? 'flex' : 'none' }}>
        <h2>Bem-Vindo !</h2>
        <TextInput label="Login" name="login" placeholder="Digite seu login" inputRef={usernameRef} />
        <TextInput label="Senha" name="password" placeholder="Digite sua senha" inputRef={passwordRef} isPassword />
        <FormButton label="Entrar" onClick={() => login()} />
        <div onClick={() => setIsLogin(false)} role="none" style={{ marginTop: 30, color: '#22232882' }}>Sem conta? Registre-se aqui</div>
        { /* todo: social media */ }
      </div>

      <div className={styles.form} style={{ display: isLogin ? 'none' : 'flex' }}>
        <h2>Cadastrar</h2>
        <div style={{ display: 'none' }}><TextInput label="Nome" name="name" placeholder="Digite seu nome" inputRef={nameRef} /></div>
        <TextInput label="Usuário" name="username" placeholder="meuNick" inputRef={usernameRRef} />
        <div style={{ display: 'none' }}><TextInput label="Email" name="email" placeholder="pessoa@dominio.com" inputRef={emailRef} /></div>
        <TextInput label="Senha" name="password" placeholder="Digite sua senha" inputRef={passwordRRef} isPassword />
        <FormButton label="Cadastrar" onClick={() => register()} />
        <div onClick={() => setIsLogin(true)} role="none" style={{ marginTop: 30, color: '#22232882' }}>Tem uma conta? Faça login aqui</div>
        { /* todo: social media */ }
      </div>
      <div style={{ height: 80 }}> </div>
    </div>
  );
}
