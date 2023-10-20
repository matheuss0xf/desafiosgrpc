package main

import (
	"os"

	"github.com/jinzhu/gorm"
	"github.com/matheuss0xf/desafiosgrpc/golang/application/grpc"
	"github.com/matheuss0xf/desafiosgrpc/golang/infrastructure/db"
)

var database *gorm.DB

func main() {
	database = db.ConnectDB(os.Getenv("env"))

	grpc.StartGrpcServer(database, 50051)

}
