// Cron — Rental Reminders — A Biblioteca Secrata
// PocketBase 0.39.3

cronAdd("rental-reminders", "0 * * * *", function() {
    try {
        var now = new Date();
        var in24h = new Date(now);
        in24h.setDate(in24h.getDate() + 1);

        var nowStr = now.toISOString();
        var in24hStr = in24h.toISOString();

        var filter = "status = 'active' && endDate >= '" + nowStr + "' && endDate <= '" + in24hStr + "'";

        var rentals = $app.dao().findRecordsByFilter(
            "rentals",
            filter,
            "",
            0,
            0
        );

        for (var i = 0; i < rentals.length; i++) {
            var rental = rentals[i];
            var rentalId = rental.id;
            var bookId = rental.get("bookId");
            var buyerId = rental.get("buyerId");
            var endDate = rental.get("endDate");

            var bookTitle = "desconhecido";
            try {
                var book = $app.dao().findRecordById("books", bookId);
                bookTitle = book.get("title");
            } catch (bookErr) {
                // ignore
            }

            var buyerName = "desconhecido";
            try {
                var buyer = $app.dao().findRecordById("users", buyerId);
                buyerName = buyer.get("name") || buyer.get("email");
            } catch (buyerErr) {
                // ignore
            }

            console.log("[RENTAL REMINDER] Aluguel " + rentalId + " expira em breve");
            console.log("  Livro: " + bookTitle);
            console.log("  Locatário: " + buyerName);
            console.log("  Data de devolução: " + endDate);
        }

        if (rentals.length > 0) {
            console.log("[RENTAL REMINDER] Total de lembretes: " + rentals.length);
        }
    } catch (err) {
        console.log("[RENTAL REMINDER] Erro: " + err.message);
    }
});
