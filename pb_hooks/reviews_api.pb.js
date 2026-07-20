// Reviews API — A Biblioteca Secrata
// PocketBase 0.39.3

routerAdd("POST", "/api/reviews", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var body = {};
        e.bindJSON(&body);

        if (!body.bookId || !body.rating) {
            return e.json(400, { "error": "Campos obrigatórios: bookId, rating" });
        }

        var rating = parseInt(body.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return e.json(400, { "error": "Nota deve ser entre 1 e 5" });
        }

        var book;
        try {
            book = $app.dao().findRecordById("books", body.bookId);
        } catch (err) {
            return e.json(404, { "error": "Livro não encontrado" });
        }

        if (book.get("sellerId") === e.auth.id) {
            return e.json(400, { "error": "Você não pode avaliar seu próprio livro" });
        }

        var orders = $app.dao().findRecordsByFilter(
            "orders",
            "buyerId = '" + e.auth.id + "' && status = 'paid'",
            "",
            0,
            0
        );

        var hasPurchased = false;
        for (var i = 0; i < orders.length; i++) {
            var bookIds = orders[i].get("bookIds");
            if (bookIds) {
                for (var j = 0; j < bookIds.length; j++) {
                    if (bookIds[j] === body.bookId) {
                        hasPurchased = true;
                        break;
                    }
                }
            }
            if (hasPurchased) { break; }
        }

        if (!hasPurchased) {
            return e.json(403, { "error": "Você precisa ter comprado este livro para avaliá-lo" });
        }

        var existing = $app.dao().findRecordsByFilter(
            "reviews",
            "bookId = '" + body.bookId + "' && buyerId = '" + e.auth.id + "'",
            "",
            1,
            0
        );

        if (existing.length > 0) {
            return e.json(400, { "error": "Você já avaliou este livro" });
        }

        var collection = $app.dao().findCollectionByNameOrId("reviews");
        var review = new Record(collection);

        review.set("bookId", body.bookId);
        review.set("buyerId", e.auth.id);
        review.set("sellerId", book.get("sellerId"));
        review.set("rating", rating);
        review.set("comment", body.comment || "");

        $app.dao().saveRecord(review);

        return e.json(201, review.publicExport());
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});

routerAdd("GET", "/api/reviews/:bookId", function(e) {
    try {
        var bookId = e.request.pathValue("bookId");

        var book;
        try {
            book = $app.dao().findRecordById("books", bookId);
        } catch (err) {
            return e.json(404, { "error": "Livro não encontrado" });
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

        var filter = "bookId = '" + bookId + "'";
        var records = $app.dao().findRecordsByFilter(
            "reviews",
            filter,
            "-created",
            perPage,
            (page - 1) * perPage
        );

        var allReviews = $app.dao().findRecordsByFilter(
            "reviews",
            filter,
            "",
            0,
            0
        );

        var totalRating = 0;
        for (var i = 0; i < allReviews.length; i++) {
            totalRating += allReviews[i].get("rating");
        }
        var avgRating = 0;
        if (allReviews.length > 0) {
            avgRating = totalRating / allReviews.length;
        }

        var items = [];
        for (var j = 0; j < records.length; j++) {
            items.push(records[j].publicExport());
        }

        return e.json(200, {
            bookId: bookId,
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews: allReviews.length,
            page: page,
            perPage: perPage,
            items: items
        });
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});
