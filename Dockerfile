FROM golang:1.24-alpine

WORKDIR /usr/src/kusmala-playground

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o app main.go

EXPOSE 8000

CMD ["./app"]

