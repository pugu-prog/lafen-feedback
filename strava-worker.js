// Cloudflare Worker for the Lafen Trainingsfeedback page.
// Keeps the Strava client secret off the public page: exchanges/refreshes OAuth tokens
// and forwards the few read-only Strava API calls the page needs.
//
// Settings → Variables and Secrets:
//   STRAVA_CLIENT_ID      (text)    the Client ID from strava.com/settings/api
//   STRAVA_CLIENT_SECRET  (secret)  the Client Secret from strava.com/settings/api
//   ALLOWED_ORIGIN        (text)    https://pugu-prog.github.io

const API = /^\/api\/(athlete\/activities|activities\/\d+\/(laps|streams))$/;

export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || 'https://pugu-prog.github.io',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };
    const json = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    const url = new URL(req.url);

    // POST /token  {code} → first login, {refresh_token} → renew
    if (url.pathname === '/token' && req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const params = { client_id: env.STRAVA_CLIENT_ID, client_secret: env.STRAVA_CLIENT_SECRET };
      if (body.code) Object.assign(params, { code: body.code, grant_type: 'authorization_code' });
      else if (body.refresh_token) Object.assign(params, { refresh_token: body.refresh_token, grant_type: 'refresh_token' });
      else return json({ message: 'code or refresh_token missing' }, 400);
      const r = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params),
      });
      const j = await r.json();
      return json({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at, message: j.message }, r.status);
    }

    // GET /api/… → Strava API (read-only, only the endpoints the page uses)
    if (req.method === 'GET' && API.test(url.pathname)) {
      const r = await fetch('https://www.strava.com/api/v3/' + url.pathname.slice(5) + url.search, {
        headers: { Authorization: req.headers.get('Authorization') || '' },
      });
      return new Response(r.body, { status: r.status, headers: { ...cors, 'Content-Type': 'application/json' } });
    }

    return json({ message: 'not found' }, 404);
  },
};
