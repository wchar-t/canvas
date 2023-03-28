import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Api from '../lib/api';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    if (Api.getLocalSession()) {
      push('/board/new');
    } else {
      push('/login');
    }
  }, []);

  return <div> </div>;
}
