import { Sight } from '@mogilev-guide/models'

export async function getSight(id: Sight['id']): Promise<Sight> {
  return fetch(`/api/sight/${id}`, { method: 'GET' }).then(response => response.json());
}
