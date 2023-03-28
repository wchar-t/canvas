import withMethod from '../../../middlewares/method';
import withSession from '../../../middlewares/session';
import { CanvasApiRequest } from '../../../interfaces/server/request';
import { CanvasApiResponse } from '../../../interfaces/server/response';
import prisma from '../../../lib/prisma';

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const { password, new: newPassword } = req.body;

  if (!password || !newPassword) {
    return res.status(400).json({
      error: {
        code: 'bad_request',
        message: 'Campo(s) faltando',
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.session?.id,
    },
  });

  if (user?.password !== password) {
    return res.status(400).json({
      error: {
        code: 'wrong_password',
        message: 'Senha incorreta',
      },
    });
  }

  await prisma.user.update({
    where: {
      id: req.session?.id,
    },
    data: {
      password: newPassword,
    },
  });

  return res.status(200).json({
    error: false,
    result: 'Alterado com sucesso',
  });
}

export default withSession(withMethod(handler, ['POST']));
