import { error } from "console";
import express, { response } from "express"
import { request } from "http";
import path from "path";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
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

	try {
		console.log("Fetching data for: ", query);
		const apiResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
		const responseData = await apiResponse.json();

		const results = responseData.data;

		response.render("search", {
			title: `Results for ${query}`, query, results
		});
	} catch (error) {
		console.error("Error fetching anime:", error);
		response.status(500).send("Error fetching data from Jikan API.");
	}
});

app.get("/anime/:id", async(request, response) => {
	const animeID = request.params.id;

	try {
		console.log("Fetching anime details for ID:", animeID);
		const apiResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeID}`);
		const responseData = await apiResponse.json();
		const anime = responseData.data;

		let animeQuote = null;
		try {
			const quoteResponse = await fetch(`https://api.animechan.io/v1/quotes/random?anime=${encodeURIComponent(anime.title)}`);
			animeQuote = await quoteResponse.json();
			console.log("Quote API response:", quoteData);
		} catch (quoteError) {
			console.error("Quote fetch error:", quoteError);
		} 

		response.render("anime", {
			title: anime.title, anime, animeQuote
		});
	} catch (error) {
		console.error("Error fetching anime details:", error);
		response.status(500).send("Could not load anime details.");
	}
});