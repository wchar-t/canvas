import fsPromises from 'fs/promises';
import path from 'path';
import withMethod from '../../../middlewares/method';
import withSession from '../../../middlewares/session';
import { CanvasApiRequest } from '../../../interfaces/server/request';
import { CanvasApiResponse } from '../../../interfaces/server/response';
import prisma from '../../../lib/prisma';

async function get(req: CanvasApiRequest, res: CanvasApiResponse) {
  const board = await prisma.board.findUnique({
    where: {
      id: req.query.id as string,
    },
  });

  if (!board || board.userId !== (req.session?.id ?? '')) {
    return res.status(404).json({
      error: {
        code: 'board_not_found',
        message: 'Quadro não encontrado ou você não tem acesso.',
      },
    });
  }

  const dir = path.join(__dirname, '../../../../../boards', `${board.id}.json`);

  try {
    const data = await fsPromises.readFile(dir, 'utf-8');
    return res.status(200).json({ error: false, result: data });
  } catch (e) {
    return res.status(200).json({ error: false, result: '{}' });
  }
}

async function post(req: CanvasApiRequest, res: CanvasApiResponse) {
  const board = await prisma.board.findUnique({
    where: {
      id: req.query.id as string,
    },
  });

  if (!board || board.userId !== (req.session?.id ?? '')) {
    return res.status(404).json({
      error: {
        code: 'board_not_found',
        message: 'Quadro não encontrado ou você não tem acesso.',
      },
    });
  }

  const dir = path.join(__dirname, '../../../../../boards', `${board.id}.json`);
  await fsPromises.writeFile(dir, JSON.stringify(req.body.data));

  return res.status(200).json({ error: false, result: 'Salvo com sucesso.' });
}

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  if (req.method === 'GET') {
    return get(req, res);
  }

  if (req.method === 'POST') {
    return post(req, res);
  }

  return res.status(405).json({ error: true, result: 'Método não permitido.' });
}

export default withSession(withMethod(handler, ['GET', 'POST']));
