import withMethod from '../../../middlewares/method';
import withSession from '../../../middlewares/session';
import { CanvasApiRequest } from '../../../interfaces/server/request';
import { CanvasApiResponse } from '../../../interfaces/server/response';

async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  const { data } = req.body; // should be a PNG b64 encoded
  const formData = new FormData();

  formData.set('data', data);

  const response = await fetch(`http://${process.env.SUGGESTION_BACKEND}/predict`, {
    method: 'POST',
    body: formData,
  }).then((e) => e.text());

  return res.status(200).json({ error: false, result: response });
}

export default withSession(withMethod(handler, ['POST']));
