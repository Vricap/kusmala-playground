# ---------- Builder Stage ----------
FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app main.go

# ---------- Final Runtime Stage ----------
FROM alpine:latest

WORKDIR /app

# Add CA certificates (needed for HTTPS calls)
RUN apk add --no-cache ca-certificates

COPY --from=builder /app/ .

EXPOSE 8000

CMD ["./app"]
