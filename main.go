package main

import (
	"context"
	"fmt"
	"io"
	"os/exec"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin" // TODO: gin is BLOAT. better rewrite it to use Go standart http package
)

const HOST string = "0.0.0.0"
const PORT string = ":8000"

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.LoadHTMLGlob("frontend/*")
	router.Static("/static", "./frontend")

	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", gin.H{})
	})

	router.POST("/run", func(c *gin.Context) {
		body, err := io.ReadAll(c.Request.Body)
		if err != nil {
			fmt.Println(err)
		}

		// Set a timeout
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		// Prepare command with context
		cmd := exec.CommandContext(ctx, "./kusmala_linux_amd64", "-text", fmt.Sprintf("%s", body))

		// Run command and get combined output (stdout + stderr)
		output, err := cmd.CombinedOutput()

		// Check if context deadline was exceeded
		if ctx.Err() == context.DeadlineExceeded {
			fmt.Println("Execution timed out!")
			c.String(500, "Execution timed out!")
			return
		}

		if err != nil {
			fmt.Println("Error:", err)
			c.String(500, fmt.Sprintf("%s", err))
		}

		c.String(200, string(output))
	})

	router.Run(HOST + PORT)
}
