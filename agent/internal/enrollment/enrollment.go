package enrollment

import (
	"os"

	"hi5central-agent/internal/api"
	"hi5central-agent/internal/config"
)

func Run(client *api.Client, cfg *config.Config) error {
	hostname, _ := os.Hostname()

	return client.Post("/agent/enroll", map[string]any{
		"tenantSlug":     cfg.TenantSlug,
		"deviceName":     hostname,
		"hostname":       hostname,
		"operatingSystem": "Windows",
		"osVersion":      "Unknown",
		"agentVersion":   "0.1.0",
	})
}
