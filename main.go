package main

import (
    "flag"
    "log"
    "net/http"
    "systrack/handlers"
)

func main() {
    // Define a flag for the port with a default value of ":8000"
    port := flag.String("port", ":8000", "Specify the port to run the server on")
    
    // Parse the command-line flags
    flag.Parse()
    
    http.HandleFunc("/api/resources", handlers.GetResources)
    
    // Log the message with the specified or default port
    log.Printf("Server is running and listening on port %s\n", *port)
    log.Fatal(http.ListenAndServe(*port, nil))
}
