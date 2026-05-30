package heartbeat

import (
	"hi5central-agent/internal/api"
)

func Send(
	client *api.Client,
	deviceID string,
) error {

	return client.Post("/agent/heartbeat", map[string]any{
		"deviceId": deviceID,
		"agentVersion": "0.1.0",
	})
}
