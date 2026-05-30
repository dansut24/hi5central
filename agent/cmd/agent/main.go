package main

import (
	"log"
	"time"

	"hi5central-agent/internal/config"
	"hi5central-agent/internal/enrollment"
	"hi5central-agent/internal/heartbeat"
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

	for {

		if err := heartbeat.Send(cfg, deviceID); err != nil {
			log.Println("Heartbeat failed:", err)
		} else {
			log.Println("Heartbeat successful")
		}

		time.Sleep(30 * time.Second)
	}
}
