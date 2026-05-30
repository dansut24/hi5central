package enrollment

type Response struct {
	Success bool   `json:"success"`
	Action  string `json:"action"`

	Device struct {
		ID string `json:"id"`
	} `json:"device"`
}
