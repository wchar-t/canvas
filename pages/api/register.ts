import { encrypt as encryptJwt } from '../../middlewares/session';
import { Session } from '../../interfaces/shared/session';
import withMethod from '../../middlewares/method';
import { CanvasApiRequest } from '../../interfaces/server/request';
import { CanvasApiResponse } from '../../interfaces/server/response';
import prisma from '../../lib/prisma';

/* eslint-disable no-underscore-dangle */

interface params {
    name: string,
    username: string,
    email: string,
    password: string,
}

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
    const { name, username, email, password }: params = req.body;
  
    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: true, result: 'Campos não preenchidos.' });
    }
  
    let doc = await prisma.user.findUnique({
      where: {
        username,
      },
    });
  
    if (doc) {
      return res.status(400).json({
        error: {
          code: 'user_already_exists',
          message: 'Usuário já cadastrado',
        },
      });
    }

    await prisma.user.create({
        data: {
            email,
            password,
            username,
            profile: {
               create: {
                name,
                bio: '',
                image: 'https://i.pinimg.com/736x/c7/c3/90/c7c3904ed2164988cf011e2abb9bd793.jpg',
               } 
            },
        },
    });

    const doc2 = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
      include: {
        profile: true,
      },
    });
        
    if (!doc2 || !doc2.profile) {
      return res.status(400).json({
        error: {
          code: 'invalid_credentials',
          message: 'E-mail inválido ou senha incorreta.',
        },
      });
    }

    const session: Session = {
      id: doc2.id,
      username: doc2.username,
      email: doc2.email,
      profile: {
        id: doc2.id,
        name: doc2.profile.name,
        bio: doc2.profile.bio,
        image: doc2.profile.image,
      },
      createdAt: doc2.createdAt,
    };
  
    const jwt = encryptJwt(session);
  
    return res.status(200).json({ error: false, result: { jwt } });
  }
  
  export default withMethod(handler, ['POST']);
