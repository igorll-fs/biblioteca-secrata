// Stripe Webhook — A Biblioteca Secrata
// PocketBase 0.39.3

routerAdd("POST", "/api/webhooks/stripe", function(e) {
    try {
        var webhookSecret = $os.getenv("STRIPE_WEBHOOK_SECRET");

        var body = e.request.body;
        if (!body || body.length === 0) {
            return e.json(400, { "error": "Corpo vazio" });
        }

        var sigHeader = "";
        var headers = e.request.headers;
        var headerKeys = Object.keys(headers);
        for (var k = 0; k < headerKeys.length; k++) {
            if (headerKeys[k].toLowerCase() === "stripe-signature") {
                sigHeader = headers[headerKeys[k]];
                break;
            }
        }

        if (webhookSecret && webhookSecret.length > 0 && (!sigHeader || sigHeader.length === 0)) {
            return e.json(400, { "error": "Assinatura Stripe ausente" });
        }

        var event;
        try {
            event = JSON.parse(body);
        } catch (parseErr) {
            return e.json(400, { "error": "JSON inválido" });
        }

        if (!event.type) {
            return e.json(400, { "error": "Tipo de evento ausente" });
        }

        if (event.type === "checkout.session.completed") {
            var session = event.data.object;
            var orderId = null;

            if (session.metadata && session.metadata.orderId) {
                orderId = session.metadata.orderId;
            }

            if (!orderId) {
                console.log("Stripe webhook: orderId não encontrado nos metadados");
                return e.json(200, { "received": true });
            }

            var order;
            try {
                order = $app.dao().findRecordById("orders", orderId);
            } catch (err) {
                console.log("Stripe webhook: pedido não encontrado: " + orderId);
                return e.json(200, { "received": true });
            }

            order.set("status", "paid");
            order.set("paymentStatus", "paid");
            order.set("stripePaymentIntentId", session.payment_intent || "");

            $app.dao().saveRecord(order);

            var bookIds = order.get("bookIds");
            if (bookIds && bookIds.length > 0) {
                for (var i = 0; i < bookIds.length; i++) {
                    var bookId = bookIds[i];
                    var book;

                    try {
                        book = $app.dao().findRecordById("books", bookId);
                    } catch (bookErr) {
                        console.log("Stripe webhook: livro não encontrado: " + bookId);
                        continue;
                    }

                    if (book.get("type") === "rental") {
                        var rentalCollection = $app.dao().findCollectionByNameOrId("rentals");
                        var rental = new Record(rentalCollection);

                        var now = new Date();
                        var endDate = new Date(now);
                        endDate.setDate(endDate.getDate() + 30);

                        rental.set("bookId", bookId);
                        rental.set("buyerId", order.get("buyerId"));
                        rental.set("orderId", orderId);
                        rental.set("sellerId", book.get("sellerId"));
                        rental.set("status", "active");
                        rental.set("startDate", now.toISOString());
                        rental.set("endDate", endDate.toISOString());

                        $app.dao().saveRecord(rental);
                    }
                }
            }
        }

        if (event.type === "payment_intent.payment_failed") {
            var paymentIntent = event.data.object;
            var failedOrderId = null;

            if (paymentIntent.metadata && paymentIntent.metadata.orderId) {
                failedOrderId = paymentIntent.metadata.orderId;
            }

            if (failedOrderId) {
                var failedOrder;
                try {
                    failedOrder = $app.dao().findRecordById("orders", failedOrderId);
                } catch (err) {
                    console.log("Stripe webhook: pedido não encontrado: " + failedOrderId);
                    return e.json(200, { "received": true });
                }

                failedOrder.set("status", "failed");
                failedOrder.set("paymentStatus", "failed");
                $app.dao().saveRecord(failedOrder);
            }
        }

        return e.json(200, { "received": true });
    } catch (err) {
        console.log("Stripe webhook error: " + err.message);
        return e.json(500, { "error": err.message });
    }
});
