package handlers

import (
    "encoding/json"
    "net/http"
    "systrack/services"
)

func GetResources(w http.ResponseWriter, r *http.Request) {
    resources, err := services.GetResourceUsage()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resources)
}
