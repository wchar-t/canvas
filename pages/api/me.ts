import withSession, { encrypt } from '../../middlewares/session';
import { CanvasApiRequest } from '../../interfaces/server/request';
import { CanvasApiResponse } from '../../interfaces/server/response';
import prisma from '../../lib/prisma';
import { Session } from '../../interfaces/shared/session';

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.session?.id,
    },
    include: {
      profile: true,
    },
  }) as any;

  if (!user) {
    return res.status(401).json({ error: { code: 'user_not_found', message: 'Usuário não encontrado' } });
  }

  delete user.password;
  delete user.profile?.id;

  const session: Session = {
    id: user.id,
    username: user.username,
    email: user.email,
    profile: {
      id: user.id,
      name: user.profile.name,
      bio: user.profile.bio,
      image: user.profile.image,
    },
    createdAt: user.createdAt,
  }

  return res.status(200).json({ error: false, result: { user, jwt: encrypt(session) } });
}

export default withSession(handler);
