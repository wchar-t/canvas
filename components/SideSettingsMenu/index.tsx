import { useRef } from 'react';
import Item from './Item';
import Content from './Content';
import Icon from '../Icon';
import styles from '../../styles/components/SideSettingsMenu.module.css';
import TextInput from '../TextInput';
import { Session } from '../../interfaces/shared/session';
import {
  onMenuItemClick, onPublicSaveClick, onEmailSaveClick, onPasswordSaveClick,
} from '../../controllers/Settings';
import FormButton from '../FormButton';

export default function SideSettingsMenu({ session }: { session: Session }) {
  // setup input's refs
  const nameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <ul>
          <Item icon={<Icon name="user" />} label="Perfil" identifier="public" onClick={onMenuItemClick} isActive />
          <Item icon={<Icon name="lock" />} label="Segurança" identifier="security" onClick={onMenuItemClick} />
        </ul>
      </div>
      <div className={styles.content}>
        <Content identifier="public" title="Perfil público" isActive>
          <TextInput label="Nome" name="name" defaultValue={session.profile.name} placeholder="Seu nome" inputRef={nameRef} />
          <TextInput label="Bio" name="bio" defaultValue={session.profile.bio} placeholder="Digite uma bio aqui" isMultiline inputRef={bioRef} />
          <FormButton label="Salvar" onClick={() => onPublicSaveClick(nameRef, bioRef)} theme="tertiary" />
        </Content>
        <Content identifier="security" title="Mudar email" isRow>
          <TextInput label="Email" name="email" defaultValue={session.email} placeholder="Seu email" inputRef={emailRef} />
          <FormButton label={<Icon name="floppy-disk" />} onClick={() => onEmailSaveClick(emailRef)} theme="tertiary" />
        </Content>
        <Content identifier="security" title="Mudar Senha">
          <TextInput label="Senha" name="password" placeholder="Sua senha antiga" isPassword inputRef={passwordRef} />
          <TextInput label="Senha" name="newpassword" placeholder="Sua senha nova" isPassword inputRef={newPasswordRef} />
          <FormButton label="Salvar" onClick={() => onPasswordSaveClick(passwordRef, newPasswordRef)} theme="tertiary" />
        </Content>
      </div>
    </div>
  );
}
