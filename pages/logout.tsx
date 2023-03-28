import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
  const { push } = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    push('/login');
  }, []);

  return (
    <div>
      Saindo...
    </div>
  );
}
