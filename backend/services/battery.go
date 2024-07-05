// services/battery.go

package services

import (
    "log"
    "github.com/distatus/battery"
)

func GetBatteryUsage() (float64, error) {
    log.Println("Fetching battery usage...")

    batteries, err := battery.GetAll()
    if err != nil {
        log.Println("Error fetching battery usage:", err)
        return 0, err
    }

    var batteryPercent float64
    if len(batteries) > 0 {
        batteryPercent = batteries[0].Current / batteries[0].Full * 100
    }

    log.Printf("Battery usage: %.2f%%\n", batteryPercent)

    return batteryPercent, nil
}
