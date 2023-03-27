import { NextApiRequest } from 'next';
import { Session } from './session';

export interface CanvasApiRequest extends NextApiRequest {
  session?: Session,
}
