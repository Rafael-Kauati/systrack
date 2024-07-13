package handlers

import (
    "net/http"
    "systrack/services"
    "github.com/gin-gonic/gin"
)

func GetResources(c *gin.Context) {
    resourceType := c.Query("type") 

    var (
        data interface{}
        err  error
    )

    switch resourceType {
    case "cpu":
        data, err = services.GetCPUUsage()
    case "memory":
        data, err = services.GetMemoryUsage()
    case "disk":
        data, err = services.GetDiskUsage()
    case "network":
        bytesSent, bytesRecv, netErr := services.GetNetworkUsage()
        if netErr != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": netErr.Error()})
            return
        }
        data = map[string]int64{
            "bytesSent": bytesSent,
            "bytesRecv": bytesRecv,
        }
    case "battery":
        data, err = services.GetBatteryUsage()
    default:
        data, err = services.GetResourceUsage()
    }

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, data)
}
