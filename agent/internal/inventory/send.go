package inventory

import (
	"bytes"
	"encoding/json"
	"net/http"

	"hi5central-agent/internal/config"
)

func Send(
	cfg *config.Config,
	deviceID string,
	inventory Inventory,
) error {

	payload := map[string]any{
		"deviceId":         deviceID,
		"cpu":              inventory.CPU,
		"ramGb":            inventory.RAMGB,
		"diskGb":           inventory.DiskGB,
		"gpu":              inventory.GPU,
		"loggedInUser":     inventory.LoggedInUser,
		"bitlockerEnabled": inventory.BitLockerEnabled,
		"tpmVersion":       inventory.TPMVersion,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	resp, err := http.Post(
		cfg.APIURL+"/agent/inventory",
		"application/json",
		bytes.NewBuffer(body),
	)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	return nil
}
