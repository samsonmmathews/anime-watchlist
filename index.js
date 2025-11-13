import express from "express"
import path from "path";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

app.set("views");
app.set("view engine", "pug");  
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
  	response.render("index", { title: "Anime Watchlist" });
});

app.listen(port, () => {
  	console.log(`Listening on http://localhost:${port}`);
});

app.get("/search", async(request, response) => {
  	const query = request.query.searchAnime;

	if(!query) {
		console.log("No data found");
		return response.redirect("/");
	}

	// try {
	// 	console.log("Test");
	// } catch (error) {
	// 	console.error("Error fetching anime:", error);
	// 	response.status(500).send("Error fetching data from Jikan API.");
	// }
});