import jsonwebtoken from 'jsonwebtoken';
import { CanvasApiRequest } from '../interfaces/server/request';
import { CanvasApiResponse } from '../interfaces/server/response';
import { Session } from '../interfaces/server/session';

export function decrypt(jwt: string | null): Session | boolean {
  if (!jwt) {
    return false;
  }

  try {
    const token = jsonwebtoken.verify(jwt, process.env.JWT_KEY || '') as Session;
    return token;
  } catch (e) {
    return false;
  }
}

export function encrypt(data: string | object): string {
  return jsonwebtoken.sign(data, process.env.JWT_KEY || '', { noTimestamp: true });
}

export default function withSession(
  handler: (req: CanvasApiRequest, res: CanvasApiResponse) => void,
): any {
  return async (req: CanvasApiRequest, res: CanvasApiResponse) => {
    const session = decrypt((req.headers?.authorization || '').replace('Bearer ', ''));

    if (!session) {
      return res.status(401).json({ error: true, result: 'Não autenticado.' });
    }

    req.session = (session as Session);

    return handler(req, res);
  };
}
