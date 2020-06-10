import * as functions from 'firebase-functions';

export const GUIDE_ENV_CONFIG = {
  CLIENT_ID: functions.config().guide.client_id,
  CLIENT_SECRET: functions.config().guide.client_secret,
  /*  REDIRECT_URL: `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/api/login/google/callback`,
  REDIRECT_IF_FAIL_URL: `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/api/login/google`,
  GOOGLE_INFO_URL: 'https://www.googleapis.com/oauth2/v1/userinfo',
  SUCCESS_LOGIN_URL: `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/api/api/interests`
 */
  REDIRECT_URL:
    'http://localhost:5000/mogilev-guide/us-central1/api/login/google/callback',
  REDIRECT_IF_FAIL_URL:
    'http://localhost:5000/mogilev-guide/us-central1/api/login/google',
  GOOGLE_INFO_URL: 'https://www.googleapis.com/oauth2/v1/userinfo',
  SUCCESS_LOGIN_URL:
    'http://localhost:5000/mogilev-guide/us-central1/api/api/interests'
};