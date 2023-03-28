import { Session } from './session';

// /api/me response
export default interface Me {
  user: Session,
  jwt: string,
}
