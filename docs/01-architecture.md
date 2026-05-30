# Hi5Central Architecture

## Services

Hi5Central is split into clear services:

- Web portal
- API
- Realtime gateway
- Worker service
- PostgreSQL
- Redis
- TURN relay
- Go agent

## Remote Access Principle

Remote access must use separate paths for video and input.

Video path:

```txt
Streamer -> WebRTC video track -> Viewer
