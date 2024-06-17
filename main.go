package main

import (
    "log"
    "net/http"
    "systrack/handlers"
)

func main() {
    http.HandleFunc("/api/resources", handlers.GetResources)
    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
