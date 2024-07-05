// services/network.go

package services

import (
    "log"
    "github.com/shirou/gopsutil/net"
)

func GetNetworkUsage() (int64, int64, error) {
    log.Println("Fetching network usage...")

    netStat, err := net.IOCounters(false)
    if err != nil {
        log.Println("Error fetching network usage:", err)
        return 0, 0, err
    }

    log.Printf("Network usage (bytes sent/received): %d / %d\n", netStat[0].BytesSent, netStat[0].BytesRecv)

    return int64(netStat[0].BytesSent), int64(netStat[0].BytesRecv), nil
}
