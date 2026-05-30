package enrollment

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"

	"hi5central-agent/internal/config"
)

func Run(cfg *config.Config) (string, error) {

	hostname, _ := os.Hostname()

	payload := map[string]any{
		"tenantSlug":      cfg.TenantSlug,
		"deviceName":      hostname,
		"hostname":        hostname,
		"operatingSystem": "Linux",
		"osVersion":       "Codespaces",
		"agentVersion":    "0.1.0",
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	resp, err := http.Post(
		cfg.APIURL+"/agent/enroll",
		"application/json",
		bytes.NewBuffer(body),
	)

	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	var result Response

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}

	return result.Device.ID, nil
}
