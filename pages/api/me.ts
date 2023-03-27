import withSession from '../../middlewares/session';
import { CanvasApiRequest } from '../../interfaces/server/request';
import { CanvasApiResponse } from '../../interfaces/server/response';
import prisma from '../../lib/prisma';

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
    return res.status(401).json({ error: { code: 'user_not_found', message: 'Usuário não encontrado.' } });
  }

  delete user.password;
  delete user.profile?.id;

  return res.status(200).json({ error: false, result: user });
}

export default withSession(handler);
