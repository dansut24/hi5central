package inventory

import (
	"runtime"
)

type Inventory struct {
	CPU string
	RAM int
	Disk int
	GPU string
}

func Collect() Inventory {
	return Inventory{
		CPU: runtime.GOARCH,
		RAM: 0,
		Disk: 0,
		GPU: "Unknown",
	}
}
