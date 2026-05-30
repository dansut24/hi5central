package api

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type Client struct {
	BaseURL string
}

func New(baseURL string) *Client {
	return &Client{
		BaseURL: baseURL,
	}
}

func (c *Client) Post(path string, payload any) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	resp, err := http.Post(
		c.BaseURL+path,
		"application/json",
		bytes.NewBuffer(body),
	)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	return nil
}
