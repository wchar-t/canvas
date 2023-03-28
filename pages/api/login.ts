import { encrypt as encryptJwt } from '../../middlewares/session';
import { Session } from '../../interfaces/shared/session';
import withMethod from '../../middlewares/method';
import { CanvasApiRequest } from '../../interfaces/server/request';
import { CanvasApiResponse } from '../../interfaces/server/response';
import prisma from '../../lib/prisma';

/* eslint-disable no-underscore-dangle */

interface params {
  username: string,
  password: string,
}

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const { username, password }: params = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: true, result: 'Dados inválidos.' });
  }

  const doc = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      profile: true,
    },
  });

  if (!doc || !doc.profile) {
    return res.status(400).json({
      error: {
        code: 'invalid_credentials',
        message: 'E-mail inválido ou senha incorreta.',
      },
    });
  }

  if (doc.password !== password) {
    return res.status(400).json({
      error: {
        code: 'invalid_password',
        message: 'Senha inválida.',
      },
    });
  }

  const session: Session = {
    id: doc.id,
    username: doc.username,
    email: doc.email,
    profile: {
      id: doc.id,
      name: doc.profile.name,
      bio: doc.profile.bio,
      image: doc.profile.image,
    },
    createdAt: doc.createdAt,
  };

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { jwt } });
}

export default withMethod(handler, 'POST');
