package models

type ResourceUsage struct {
    CPUUsage     float64 `json:"cpu_usage"`
    MemoryUsage  float64 `json:"memory_usage"`
    DiskUsage    float64 `json:"disk_usage"`   
    NetworkUsage float64 `json:"network_usage"` 
    BatteryUsage float64 `json:"battery_usage"`
}
