import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Api from '../../lib/api';

export default function NewBoard() {
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { error, result } = await Api.createBoard();

      if (!error) {
        push(`/board/${result.id}`);
      }
    })();
  }, []);

  return <div> Loading... </div>;
}
