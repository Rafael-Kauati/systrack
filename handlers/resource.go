package handlers

import (
    "net/http"
    "systrack/services"
    "systrack/utils"
)

func GetResources(w http.ResponseWriter, r *http.Request) {
    resources, err := services.GetResourceUsage()
    if err != nil {
        utils.JSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
        return
    }
    utils.JSONResponse(w, http.StatusOK, resources)
}
