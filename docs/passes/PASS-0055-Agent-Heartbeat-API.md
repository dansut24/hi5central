# PASS-0055 Agent Heartbeat API

## Overview

Adds periodic agent check-ins.

Agents will call:

POST /agent/heartbeat

every 30-60 seconds.

---

# Objective

Keep devices marked online automatically.

---

# Endpoint

POST /agent/heartbeat

---

# Request

{
  "deviceId": "...",
  "agentVersion": "1.0.0",
  "publicIp": "203.0.113.50",
  "localIp": "192.168.1.50"
}

---

# Behaviour

Update:

- last_seen_at
- status
- agent_version
- public_ip
- local_ip

---

# Success Criteria

Heartbeat updates existing device.

Future offline detection possible.
