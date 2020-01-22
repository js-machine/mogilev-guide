import { Interest } from '@mogilev-guide/models';

export async function getInterests(): Promise<Interest[]> {
  return fetch('/api/interests', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json());
}
