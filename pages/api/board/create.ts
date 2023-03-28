import withSession from '../../../middlewares/session';
import { CanvasApiRequest } from '../../../interfaces/server/request';
import { CanvasApiResponse } from '../../../interfaces/server/response';
import prisma from '../../../lib/prisma';

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const board = await prisma.board.create({
    data: {
      title: 'New Board',
      userId: req.session?.id ?? '',
    },
  });

  return res.status(200).json({ error: false, result: board });
}

export default withSession(handler);
