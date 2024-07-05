// services/memory.go

package services

import (
    "log"
    "github.com/shirou/gopsutil/mem"
)

func GetMemoryUsage() (float64, error) {
    log.Println("Fetching memory usage...")

    vmStat, err := mem.VirtualMemory()
    if err != nil {
        log.Println("Error fetching memory usage:", err)
        return 0, err
    }

    log.Printf("Memory usage: %.2f%%\n", vmStat.UsedPercent)

    return vmStat.UsedPercent, nil
}
