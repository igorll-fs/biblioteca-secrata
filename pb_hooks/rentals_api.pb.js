// Rentals API — A Biblioteca Secrata
// PocketBase 0.39.3

routerAdd("GET", "/api/rentals/my-rentals", function(e) {
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
            "rentals",
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

routerAdd("POST", "/api/rentals/:id/return", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var id = e.request.pathValue("id");
        var rental;

        try {
            rental = $app.dao().findRecordById("rentals", id);
        } catch (err) {
            return e.json(404, { "error": "Aluguel não encontrado" });
        }

        if (rental.get("buyerId") !== e.auth.id) {
            return e.json(403, { "error": "Sem permissão para devolver este aluguel" });
        }

        if (rental.get("status") === "returned") {
            return e.json(400, { "error": "Este aluguel já foi devolvido" });
        }

        rental.set("status", "returned");
        rental.set("returnedAt", new Date().toISOString());

        $app.dao().saveRecord(rental);

        return e.json(200, rental.publicExport());
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});
