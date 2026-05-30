package inventory

import (
	"os"
	"runtime"
)

type Inventory struct {
	CPU              string
	RAMGB            int
	DiskGB           int
	GPU              string
	LoggedInUser     string
	BitLockerEnabled bool
	TPMVersion       string
}

func Collect() Inventory {

	user := os.Getenv("USER")

	if user == "" {
		user = os.Getenv("USERNAME")
	}

	return Inventory{
		CPU:              runtime.GOARCH,
		RAMGB:            0,
		DiskGB:           0,
		GPU:              "Unknown",
		LoggedInUser:     user,
		BitLockerEnabled: false,
		TPMVersion:       "Unknown",
	}
}
