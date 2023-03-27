import Api from '../lib/api';

export async function loadSession() {
  const { error, result } = await Api.me();

  if (error) {
    return null;
  }

  return result;
}

export async function loadSettings() {
  // todo
}
