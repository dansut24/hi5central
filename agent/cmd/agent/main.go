package main

import (
	"log"
	"time"

	"hi5central-agent/internal/api"
	"hi5central-agent/internal/config"
	"hi5central-agent/internal/enrollment"
)

func main() {

	cfg, err := config.Load("config.json")
	if err != nil {
		log.Fatal(err)
	}

	client := api.New(cfg.APIURL)

	if err := enrollment.Run(client, cfg); err != nil {
		log.Fatal(err)
	}

	log.Println("Enrollment successful")

	for {
		log.Println("Heartbeat tick")

		time.Sleep(30 * time.Second)
	}
}
