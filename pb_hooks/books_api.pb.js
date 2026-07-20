// Books API — A Biblioteca Secrata
// PocketBase 0.39.3

routerAdd("GET", "/api/books/search", function(e) {
    try {
        var page = 1;
        var perPage = 20;
        var filters = [];
        var sort = "-created";

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

        var sortParam = e.request.url.query().get("sort");
        if (sortParam && sortParam.length > 0) {
            sort = sortParam;
        }

        filters.push("deleted = false");
        filters.push("status = 'approved'");

        var title = e.request.url.query().get("title");
        if (title && title.length > 0) {
            filters.push("title ~ '" + title.replace(/'/g, "\\'") + "'");
        }

        var author = e.request.url.query().get("author");
        if (author && author.length > 0) {
            filters.push("author ~ '" + author.replace(/'/g, "\\'") + "'");
        }

        var genre = e.request.url.query().get("genre");
        if (genre && genre.length > 0) {
            filters.push("genre = '" + genre.replace(/'/g, "\\'") + "'");
        }

        var type = e.request.url.query().get("type");
        if (type && type.length > 0) {
            filters.push("type = '" + type.replace(/'/g, "\\'") + "'");
        }

        var condition = e.request.url.query().get("condition");
        if (condition && condition.length > 0) {
            filters.push("condition = '" + condition.replace(/'/g, "\\'") + "'");
        }

        var minPrice = e.request.url.query().get("minPrice");
        if (minPrice && minPrice.length > 0) {
            var minP = parseFloat(minPrice);
            if (!isNaN(minP)) {
                filters.push("price >= " + minP);
            }
        }

        var maxPrice = e.request.url.query().get("maxPrice");
        if (maxPrice && maxPrice.length > 0) {
            var maxP = parseFloat(maxPrice);
            if (!isNaN(maxP)) {
                filters.push("price <= " + maxP);
            }
        }

        var filterStr = filters.join(" && ");

        var records = $app.dao().findRecordsByFilter(
            "books",
            filterStr,
            sort,
            perPage,
            (page - 1) * perPage
        );

        var total = $app.dao().findRecordsByFilter(
            "books",
            filterStr,
            "",
            0,
            0
        );

        var items = [];
        for (var i = 0; i < records.length; i++) {
            items.push(records[i].publicExport());
        }

        return e.json(200, {
            page: page,
            perPage: perPage,
            totalItems: total.length,
            totalPages: Math.ceil(total.length / perPage),
            items: items
        });
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});

routerAdd("POST", "/api/books", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var body = {};
        e.bindJSON(&body);

        if (!body.title || !body.author || !body.price || !body.condition || !body.type) {
            return e.json(400, { "error": "Campos obrigatórios: title, author, price, condition, type" });
        }

        var price = parseFloat(body.price);
        if (isNaN(price) || price < 0) {
            return e.json(400, { "error": "Preço inválido" });
        }

        var collection = $app.dao().findCollectionByNameOrId("books");
        var record = new Record(collection);

        record.set("title", body.title);
        record.set("author", body.author);
        record.set("description", body.description || "");
        record.set("price", price);
        record.set("condition", body.condition);
        record.set("type", body.type);
        record.set("genre", body.genre || "");
        record.set("isbn", body.isbn || "");
        record.set("imageUrl", body.imageUrl || "");
        record.set("sellerId", e.auth.id);
        record.set("status", "approved");
        record.set("deleted", false);

        $app.dao().saveRecord(record);

        return e.json(201, record.publicExport());
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});

routerAdd("PUT", "/api/books/:id", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var id = e.request.pathValue("id");
        var record;

        try {
            record = $app.dao().findRecordById("books", id);
        } catch (err) {
            return e.json(404, { "error": "Livro não encontrado" });
        }

        if (record.get("sellerId") !== e.auth.id) {
            return e.json(403, { "error": "Sem permissão para editar este livro" });
        }

        var body = {};
        e.bindJSON(&body);

        if (body.title) { record.set("title", body.title); }
        if (body.author) { record.set("author", body.author); }
        if (body.description !== undefined) { record.set("description", body.description); }
        if (body.price !== undefined) {
            var price = parseFloat(body.price);
            if (isNaN(price) || price < 0) {
                return e.json(400, { "error": "Preço inválido" });
            }
            record.set("price", price);
        }
        if (body.condition) { record.set("condition", body.condition); }
        if (body.type) { record.set("type", body.type); }
        if (body.genre !== undefined) { record.set("genre", body.genre); }
        if (body.isbn !== undefined) { record.set("isbn", body.isbn); }
        if (body.imageUrl !== undefined) { record.set("imageUrl", body.imageUrl); }

        $app.dao().saveRecord(record);

        return e.json(200, record.publicExport());
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});

routerAdd("DELETE", "/api/books/:id", function(e) {
    try {
        if (!e.auth) {
            return e.json(401, { "error": "Autenticação requerida" });
        }

        var id = e.request.pathValue("id");
        var record;

        try {
            record = $app.dao().findRecordById("books", id);
        } catch (err) {
            return e.json(404, { "error": "Livro não encontrado" });
        }

        if (record.get("sellerId") !== e.auth.id) {
            return e.json(403, { "error": "Sem permissão para excluir este livro" });
        }

        record.set("deleted", true);
        $app.dao().saveRecord(record);

        return e.json(200, { "message": "Livro removido com sucesso" });
    } catch (err) {
        return e.json(500, { "error": err.message });
    }
});
