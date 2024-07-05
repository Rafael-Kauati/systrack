// services/disk.go

package services

import (
    "log"
    "github.com/shirou/gopsutil/disk"
)

func GetDiskUsage() (float64, error) {
    log.Println("Fetching disk usage...")

    diskStat, err := disk.Usage("/")
    if err != nil {
        log.Println("Error fetching disk usage:", err)
        return 0, err
    }

    log.Printf("Disk usage: %.2f%%\n", diskStat.UsedPercent)

    return diskStat.UsedPercent, nil
}
