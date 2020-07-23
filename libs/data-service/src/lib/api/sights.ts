import { SightDto, SightReview } from '@mogilev-guide/models';

export async function getSight(id: SightDto['id']): Promise<SightDto> {
  return fetch(`/api/sights/${id}`, { method: 'GET' }).then(response =>
    response.json()
  );
}

export async function getSights(): Promise<SightDto[]> {
  return fetch(`/api/sights`, { method: 'GET' }).then(response =>
    response.json()
  );
}

export async function createSight(sight: SightDto): Promise<{ id: string }> {
  return fetch('/api/sights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sight)
  }).then(response => response.json());
}

export async function updateSight(sight: SightDto): Promise<string> {
  return fetch(`/api/sights/${sight.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sight)
  }).then(response => response.json());
}

export async function deleteSight(id: string): Promise<string> {
  return fetch(`/api/sights/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json());
}

export async function getReviews(sightId: string): Promise<SightReview[]> {
  return fetch(`/api/sights/${sightId}/reviews`, {
    method: 'GET'
  }).then(response => response.json());
}
