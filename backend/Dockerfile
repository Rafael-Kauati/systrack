FROM golang:1.20-alpine

WORKDIR /usr/src/app

COPY . .

RUN go mod tidy

RUN go build -o myapp .

CMD ["./myapp"]
