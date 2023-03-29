import withMethod from '../../../middlewares/method';
import withSession from '../../../middlewares/session';
import { CanvasApiRequest } from '../../../interfaces/server/request';
import { CanvasApiResponse } from '../../../interfaces/server/response';
import prisma from '../../../lib/prisma';

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: {
        code: 'bad_request',
        message: 'Faltando o email',
      },
    });
  }

  await prisma.user.update({
    where: {
      id: req.session?.id,
    },
    data: {
      email,
    },
  });

  return res.status(200).json({
    error: false,
    result: 'Alterado com sucesso',
  });
}

export default withSession(withMethod(handler, ['POST']));
