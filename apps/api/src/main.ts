import * as functions from 'firebase-functions';
import server from '@mogilev-guide/api/server';

export const api = functions.https.onRequest(server);
