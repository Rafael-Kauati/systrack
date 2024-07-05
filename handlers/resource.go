package handlers

import (
    "net/http"
    "systrack/services"
    "systrack/utils"
)

func GetResources(w http.ResponseWriter, r *http.Request) {
    // Parse query parameters to determine which resource data to return
    query := r.URL.Query()
    resourceType := query.Get("type") // Example: "cpu", "memory", "disk", "network", "battery"

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
            utils.JSONResponse(w, http.StatusInternalServerError, map[string]string{"error": netErr.Error()})
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
        utils.JSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }

    utils.JSONResponse(w, http.StatusOK, data)
}
