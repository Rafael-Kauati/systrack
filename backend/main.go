package main


import (
    "flag"
    "log"
    "net/http"
    "systrack/handlers"
    "github.com/rs/cors"
)

func main() {
    port := flag.String("port", ":8000", "Specify the port to run the server on")
    flag.Parse()

    // Define CORS options
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},     // Allow all origins
        AllowedMethods: []string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders: []string{"*"},     // Allow all headers
        Debug:          true,              // Enable debug output (optional)
    })

    // Create a new CORS handler
    handler := c.Handler(http.HandlerFunc(handlers.GetResources))

    // Register handler with CORS middleware
    http.Handle("/api/resources", handler)

    log.Printf("Server is running and listening on port %s\n", *port)
    log.Fatal(http.ListenAndServe(*port, nil))
}
