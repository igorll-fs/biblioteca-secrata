// Orders API — A Biblioteca Secrata
// PocketBase 0.39.3

routerAdd("POST", "/api/orders/checkout", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var body = {};
        e.bindJSON(&body);

        if (!body.items || body.items.length === 0) {
            return e.json(400, { "error": "Itens do pedido são obrigatórios" });
        }

        var orderCollection = $app.dao().findCollectionByNameOrId("orders");
        var order = new Record(orderCollection);

        var totalAmount = 0;
        var bookIds = [];
        var lineItems = [];

        for (var i = 0; i < body.items.length; i++) {
            var item = body.items[i];
            var bookRecord;

            try {
                bookRecord = $app.dao().findRecordById("books", item.bookId);
            } catch (err) {
                return e.json(400, { "error": "Livro não encontrado: " + item.bookId });
            }

            if (bookRecord.get("deleted") === true) {
                return e.json(400, { "error": "Livro indisponível: " + bookRecord.get("title") });
            }

            var qty = 1;
            if (item.quantity) {
                qty = parseInt(item.quantity);
                if (isNaN(qty) || qty < 1) { qty = 1; }
            }

            var price = bookRecord.get("price");
            totalAmount += price * qty;
            bookIds.push(item.bookId);

            lineItems.push({
                price_data: {
                    currency: "brl",
                    product_data: {
                        name: bookRecord.get("title")
                    },
                    unit_amount: Math.round(price * 100)
                },
                quantity: qty
            });
        }

        order.set("buyerId", e.auth.id);
        order.set("totalAmount", totalAmount);
        order.set("status", "pending");
        order.set("paymentStatus", "pending");
        order.set("bookIds", bookIds);

        $app.dao().saveRecord(order);

        var stripeSecret = $os.getenv("STRIPE_SECRET_KEY");
        if (!stripeSecret) {
            return e.json(500, { "error": "Stripe não configurado" });
        }

        var baseUrl = $os.getenv("APP_URL");
        if (!baseUrl || baseUrl.length === 0) {
            baseUrl = "http://localhost:8090";
        }

        var formBody = "mode=payment";
        formBody += "&success_url=" + encodeURIComponent(baseUrl + "/orders/" + order.id + "/success");
        formBody += "&cancel_url=" + encodeURIComponent(baseUrl + "/orders/" + order.id + "/cancel");
        formBody += "&metadata[orderId]=" + encodeURIComponent(order.id);
        formBody += "&metadata[buyerId]=" + encodeURIComponent(e.auth.id);

        for (var j = 0; j < lineItems.length; j++) {
            var li = lineItems[j];
            formBody += "&line_items[" + j + "][price_data][currency]=" + encodeURIComponent(li.price_data.currency);
            formBody += "&line_items[" + j + "][price_data][product_data][name]=" + encodeURIComponent(li.price_data.product_data.name);
            formBody += "&line_items[" + j + "][price_data][unit_amount]=" + li.price_data.unit_amount;
            formBody += "&line_items[" + j + "][quantity]=" + li.quantity;
        }

        var resp = $http.send({
            url: "https://api.stripe.com/v1/checkout/sessions",
            method: "POST",
            body: formBody,
            headers: {
                "Authorization": "Bearer " + stripeSecret,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 15
        });

        if (resp.statusCode !== 200) {
            order.set("status", "failed");
            order.set("paymentStatus", "failed");
            $app.dao().saveRecord(order);
            return e.json(500, { "error": "Erro ao criar sessão de pagamento" });
        }

        var session = JSON.parse(resp.raw);

        order.set("stripeSessionId", session.id);
        $app.dao().saveRecord(order);

        return e.json(200, {
            orderId: order.id,
            checkoutUrl: session.url,
            sessionId: session.id
        });
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});

routerAdd("POST", "/api/orders/:id/cancel", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var id = e.request.pathValue("id");
        var order;

        try {
            order = $app.dao().findRecordById("orders", id);
        } catch (err) {
            return e.json(404, { "error": "Pedido não encontrado" });
        }

        if (order.get("buyerId") !== e.auth.id) {
            return e.json(403, { "error": "Sem permissão para cancelar este pedido" });
        }

        if (order.get("status") !== "pending") {
            return e.json(400, { "error": "Apenas pedidos pendentes podem ser cancelados" });
        }

        order.set("status", "cancelled");
        order.set("paymentStatus", "cancelled");
        $app.dao().saveRecord(order);

        return e.json(200, { "message": "Pedido cancelado com sucesso" });
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});

routerAdd("GET", "/api/orders/my-orders", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var page = 1;
        var perPage = 20;

        var pageParam = e.request.url.query().get("page");
        if (pageParam && pageParam.length > 0) {
            var parsed = parseInt(pageParam);
            if (!isNaN(parsed) && parsed > 0) {
                page = parsed;
            }
        }

        var perPageParam = e.request.url.query().get("perPage");
        if (perPageParam && perPageParam.length > 0) {
            var parsedPP = parseInt(perPageParam);
            if (!isNaN(parsedPP) && parsedPP > 0 && parsedPP <= 100) {
                perPage = parsedPP;
            }
        }

        var filter = "buyerId = '" + e.auth.id + "'";
        var records = $app.dao().findRecordsByFilter(
            "orders",
            filter,
            "-created",
            perPage,
            (page - 1) * perPage
        );

        var items = [];
        for (var i = 0; i < records.length; i++) {
            items.push(records[i].publicExport());
        }

        return e.json(200, {
            page: page,
            perPage: perPage,
            items: items
        });
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});
