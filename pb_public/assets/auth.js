// Shared auth/API helper for the family apps portal (PocketBase backend).
const PB_AUTH_KEY = 'pb_auth';
function pbAuth() { try { return JSON.parse(localStorage.getItem(PB_AUTH_KEY)); } catch (e) { return null; } }
function pbToken() { const a = pbAuth(); return a ? a.token : null; }
function pbUser() { const a = pbAuth(); return a ? a.record : null; }
async function pbApi(path, opts) {
  opts = opts || {};
  const t = pbToken();
  const headers = Object.assign({}, opts.headers || {}, t ? { 'Authorization': t } : {});
  const r = await fetch(path, Object.assign({}, opts, { headers: headers }));
  if (r.status === 401) {
    localStorage.removeItem(PB_AUTH_KEY);
    location.href = '/login.html?next=' + encodeURIComponent(location.pathname);
    throw new Error('unauthorized');
  }
  if (!r.ok) throw new Error('http ' + r.status);
  if (r.status === 204) return null;
  return r.json();
}
function pbRequireAuth() {
  if (!pbToken()) { location.href = '/login.html?next=' + encodeURIComponent(location.pathname); return false; }
  return true;
}
function pbLogout() { localStorage.removeItem(PB_AUTH_KEY); location.href = '/login.html'; }
