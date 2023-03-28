import { CanvasApiRequest } from '../../interfaces/server/request';
import { CanvasApiResponse } from '../../interfaces/server/response';

export default async function handler(req: CanvasApiRequest, res: CanvasApiResponse) {
  return res.status(200).json({ name: 'John Doe' });
}
