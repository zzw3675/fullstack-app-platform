#!/usr/bin/env python3
# 历史版本清理：每条目标记录最多保留最近 50 个版本；超过 180 天的一律删除。
import json, urllib.request, urllib.error, datetime

BASE = "http://127.0.0.1:8090"
pw = open("/opt/pocketbase/.backup-auth").read().strip()

def call(method, path, body=None, token=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", token)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read().decode()
            return r.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        return e.code, {}

def parse_dt(s):
    s = (s or "").replace("T", " ").replace("Z", "").strip()
    for fmt in ("%Y-%m-%d %H:%M:%S.%f", "%Y-%m-%d %H:%M:%S"):
        try:
            return datetime.datetime.strptime(s, fmt)
        except Exception:
            pass
    return None

st, s = call("POST", "/api/collections/_superusers/auth-with-password",
             {"identity": "admin@example.com", "password": pw})
token = s["token"]
rows, page = [], 1
while True:
    st, j = call("GET", "/api/collections/history/records?perPage=500&page=%d&sort=-created&fields=id,target_collection,target_id,created" % page,
                 token=token)
    rows.extend(j.get("items", []))
    if page >= j.get("totalPages", 1):
        break
    page += 1

cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=180)
groups = {}
for r in rows:
    groups.setdefault((r.get("target_collection"), r.get("target_id")), []).append(r)

to_delete = []
for key, items in groups.items():
    for idx, r in enumerate(items):
        dt = parse_dt(r.get("created"))
        if idx >= 50 or (dt and dt < cutoff):
            to_delete.append(r["id"])

deleted = 0
for rid in to_delete:
    st, _ = call("DELETE", "/api/collections/history/records/" + rid, token=token)
    if st in (200, 204):
        deleted += 1
print("%s prune-history: total=%d groups=%d deleted=%d" % (
    datetime.datetime.now().isoformat(timespec="seconds"), len(rows), len(groups), deleted))
