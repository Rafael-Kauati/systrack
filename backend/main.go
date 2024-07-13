package main

import (
    "flag"
    "log"
    "systrack/handlers"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    port := flag.String("port", ":8000", "Specify the port to run the server on")
    flag.Parse()

    // Create a Gin router
    router := gin.Default()

    // Define CORS options
    config := cors.Config{
        AllowAllOrigins:  true,
        AllowMethods:     []string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"*"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }
    router.Use(cors.New(config))

    // Register routes
    router.GET("/api/resources", handlers.GetResources)

    log.Printf("Server is running and listening on port %s\n", *port)
    log.Fatal(router.Run(*port))
}
