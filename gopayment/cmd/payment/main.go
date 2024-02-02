package main

import (
	"context"
	"encoding/json"
	"log/slog"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/rodolfoHOk/fullcycle.imersao17/gopayment/internal/entity"
	"github.com/rodolfoHOk/fullcycle.imersao17/gopayment/pkg/rabbitmq"
)

// exemplo para test {"order_id": "123", "card_hash": "123", "total": 100.00}

func main() {
	ctx := context.Background()
	ch, err := rabbitmq.OpenChannel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	msgs := make(chan amqp.Delivery)
	go rabbitmq.Consume(ch, msgs, "orders")

	for msg := range msgs {
		var orderRequest entity.OrderRequest
		err := json.Unmarshal(msg.Body, &orderRequest)
		if err != nil {
			slog.Error(err.Error())
			break
		}

		response, err := orderRequest.Process()
		if err != nil {
			slog.Error(err.Error())
			break
		}
		responseJSON, err := json.Marshal(response)
		if err != nil {
			slog.Error(err.Error())
			break
		}

		err = rabbitmq.Publish(ctx, ch, string(responseJSON), "amq.direct", "PaymentDone")
		if err != nil {
			slog.Error(err.Error())
			break
		}
		msg.Ack(false)
		slog.Info("Order processed")
	}
}
