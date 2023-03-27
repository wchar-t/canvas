import { NextApiRequest } from 'next';
import { Session } from '../shared/session';

export interface CanvasApiRequest extends NextApiRequest {
  session?: Session,
}
