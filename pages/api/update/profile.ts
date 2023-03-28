import withMethod from '../../../middlewares/method';
import withSession from '../../../middlewares/session';
import { CanvasApiRequest } from '../../../interfaces/server/request';
import { CanvasApiResponse } from '../../../interfaces/server/response';
import prisma from '../../../lib/prisma';

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res.status(400).json({
      error: {
        code: 'bad_request',
        message: 'Campo(s) faltando',
      },
    });
  }

  await prisma.profile.update({
    where: {
      userId: req.session?.id,
    },
    data: {
      name,
      bio,
    },
  });

  return res.status(200).json({
    error: false,
    result: 'Alterado com sucesso',
  });
}

export default withSession(withMethod(handler, ['POST']));
