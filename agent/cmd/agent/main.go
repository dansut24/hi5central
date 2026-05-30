package main

import (
	"log"
	"time"

	"hi5central-agent/internal/config"
	"hi5central-agent/internal/enrollment"
	"hi5central-agent/internal/heartbeat"
	"hi5central-agent/internal/inventory"
)

func main() {

	cfg, err := config.Load("config.json")
	if err != nil {
		log.Fatal(err)
	}

	deviceID, err := enrollment.Run(cfg)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Enrollment successful")
	log.Println("Device ID:", deviceID)

	inv := inventory.Collect()

	if err := inventory.Send(cfg, deviceID, inv); err != nil {
		log.Println("Inventory upload failed:", err)
	} else {
		log.Println("Inventory uploaded")
	}

	inventoryTicker := time.NewTicker(5 * time.Minute)
	heartbeatTicker := time.NewTicker(30 * time.Second)

	for {

		select {

		case <-heartbeatTicker.C:

			if err := heartbeat.Send(cfg, deviceID); err != nil {
				log.Println("Heartbeat failed:", err)
			} else {
				log.Println("Heartbeat successful")
			}

		case <-inventoryTicker.C:

			inv := inventory.Collect()

			if err := inventory.Send(cfg, deviceID, inv); err != nil {
				log.Println("Inventory upload failed:", err)
			} else {
				log.Println("Inventory uploaded")
			}
		}
	}
}
