#!/bin/bash
PW=$(cat /opt/pocketbase/.backup-auth)
TOKEN=$(curl -s -X POST http://127.0.0.1:8090/api/collections/_superusers/auth-with-password -H 'Content-Type: application/json' -d "{\"identity\":\"admin@example.com\",\"password\":\"$PW\"}" | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')
NAME="auto-$(date +%Y%m%d-%H%M).zip"
curl -s -X POST http://127.0.0.1:8090/api/backups -H "Authorization: $TOKEN" -H 'Content-Type: application/json' -d "{\"name\":\"$NAME\"}" > /dev/null
ls -t /opt/pocketbase/pb_data/backups/*.zip 2>/dev/null | tail -n +4 | xargs -r rm -f
echo "made $NAME"
