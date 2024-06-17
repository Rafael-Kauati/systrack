package services

import (
    "systrack/models"
    "github.com/shirou/gopsutil/cpu"
    "github.com/shirou/gopsutil/mem"
)

func GetResourceUsage() (models.ResourceUsage, error) {
    cpuPercent, err := cpu.Percent(0, false)
    if err != nil {
        return models.ResourceUsage{}, err
    }

    vmStat, err := mem.VirtualMemory()
    if err != nil {
        return models.ResourceUsage{}, err
    }

    usage := models.ResourceUsage{
        CPUUsage:    cpuPercent[0],
        MemoryUsage: vmStat.UsedPercent,
    }

    return usage, nil
}
