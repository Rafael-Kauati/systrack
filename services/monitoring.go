package services

import (
    "log"
    "systrack/models"
    "github.com/distatus/battery"
    "github.com/shirou/gopsutil/cpu"
    "github.com/shirou/gopsutil/disk"
    "github.com/shirou/gopsutil/mem"
    "github.com/shirou/gopsutil/net"
)

func GetResourceUsage() (models.ResourceUsage, error) {
    log.Println("Starting to fetch CPU usage")
    cpuPercent, err := cpu.Percent(0, false)
    if err != nil {
        log.Println("Error fetching CPU usage:", err)
        return models.ResourceUsage{}, err
    }
    log.Printf("CPU usage: %v%%\n", cpuPercent[0])

    log.Println("Starting to fetch memory usage")
    vmStat, err := mem.VirtualMemory()
    if err != nil {
        log.Println("Error fetching memory usage:", err)
        return models.ResourceUsage{}, err
    }
    log.Printf("Memory usage: %v%%\n", vmStat.UsedPercent)

    log.Println("Starting to fetch disk usage")
    diskStat, err := disk.Usage("/")
    if err != nil {
        log.Println("Error fetching disk usage:", err)
        return models.ResourceUsage{}, err
    }
    log.Printf("Disk usage: %v%%\n", diskStat.UsedPercent)

    log.Println("Starting to fetch network usage")
    netStat, err := net.IOCounters(false)
    if err != nil {
        log.Println("Error fetching network usage:", err)
        return models.ResourceUsage{}, err
    }
    log.Printf("Network usage (bytes sent/received): %v/%v\n", netStat[0].BytesSent, netStat[0].BytesRecv)

    log.Println("Starting to fetch battery usage")
    batteries, err := battery.GetAll()
    if err != nil {
        log.Println("Error fetching battery usage:", err)
        return models.ResourceUsage{}, err
    }

    var batteryPercent float64
    if len(batteries) > 0 {
        batteryPercent = batteries[0].Current / batteries[0].Full * 100
    }
    log.Printf("Battery usage: %v%%\n", batteryPercent)


    usage := models.ResourceUsage{
        CPUUsage:    cpuPercent[0],
        MemoryUsage: vmStat.UsedPercent,
        DiskUsage:   diskStat.UsedPercent,
        NetworkUsage: float64(netStat[0].BytesRecv + netStat[0].BytesSent),
        BatteryUsage: batteryPercent,
    }

    log.Println("Successfully fetched all resource usage data")
    return usage, nil
}
