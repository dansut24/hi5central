package heartbeat

import (
	"bytes"
	"encoding/json"
	"net/http"

	"hi5central-agent/internal/config"
)

func Send(
	cfg *config.Config,
	deviceID string,
) error {

	payload := map[string]any{
		"deviceId":     deviceID,
		"agentVersion": "0.1.0",
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	resp, err := http.Post(
		cfg.APIURL+"/agent/heartbeat",
		"application/json",
		bytes.NewBuffer(body),
	)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	return nil
}
