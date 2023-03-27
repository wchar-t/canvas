import { encrypt as encryptJwt } from '../../middlewares/session';
import { Session } from '../../interfaces/server/session';
import withMethod from '../../middlewares/method';
import { CanvasApiRequest } from '../../interfaces/server/request';
import { CanvasApiResponse } from '../../interfaces/server/response';

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

  /*const doc = await req.db!.database('users').findOne<User>({ email: username.toLowerCase() });

  if (!doc) {
    return res.status(200).json({ error: true, result: 'E-mail inválido ou senha incorreta.' });
  }

  const hash = createHash('sha256');
  const hashedPassword = hash.update(password).digest('hex').toLowerCase();

  if (doc.senha!.toLowerCase() !== hashedPassword) {
    return res.status(401).json({ error: true, result: 'Senha inválida.' });
  }

  const session: Session = {
    id: doc._id!,
    email: doc.email!,
    foto: doc.foto!,
    cargo: doc.cargo!,
    dado: {
      pessoal: {
        nome: doc.dado!.pessoal.nome,
      },
    },
  };
  const jwt = encryptJwt(session);

  await req.db!.database('logs').utils.insertLog(session.id, session.dado.pessoal.nome, 'Fez Login.');*/

  return res.status(200).json({ error: false, result: {} });
}

export default withMethod(handler, 'POST');
