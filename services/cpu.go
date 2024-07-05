// services/cpu.go

package services

import (
    "log"
    "github.com/shirou/gopsutil/cpu"
)

func GetCPUUsage() (float64, error) {
    log.Println("Fetching CPU usage...")

    cpuPercent, err := cpu.Percent(0, false)
    if err != nil {
        log.Println("Error fetching CPU usage:", err)
        return 0, err
    }

    log.Printf("CPU usage: %.2f%%\n", cpuPercent[0])

    return cpuPercent[0], nil
}
