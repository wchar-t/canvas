import Item from './Item';
import Content from './Content';
import Icon from '../Icon';
import styles from '../../styles/components/SideSettingsMenu.module.css';
import TextInput from '../TextInput';
import { Session } from '../../interfaces/shared/session';
import { onMenuItemClick } from '../../controllers/Settings';
import FormButton from '../FormButton';

export default function SideSettingsMenu({ session }: { session: Session }) {
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
          <TextInput label="Nome" name="name" defaultValue={session.profile.name} placeholder="Seu nome" />
          <TextInput label="Bio" name="bio" defaultValue={session.profile.bio} placeholder="Digite uma bio aqui" isMultiline />
          <FormButton label="Salvar" onClick={() => {}} theme="tertiary" />
        </Content>
        <Content identifier="security" title="Mudar email" isRow>
          <TextInput label="Email" name="email" defaultValue={session.email} placeholder="Seu email" />
          <FormButton label={<Icon name="floppy-disk" />} onClick={() => {}} theme="tertiary" />
        </Content>
        <Content identifier="security" title="Mudar Senha">
          <TextInput label="Senha" name="password" placeholder="Sua senha antiga" isPassword />
          <TextInput label="Senha" name="newpassword" placeholder="Sua senha nova" isPassword />
          <FormButton label="Salvar" onClick={() => {}} theme="tertiary" />
        </Content>
      </div>
    </div>
  );
}
