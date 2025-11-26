import { error } from "console";
import express, { response } from "express"
import { request } from "http";
import path from "path";
import fs from "fs";

const __dirname = import.meta.dirname;

const watchlistPath = path.join(__dirname, "data", "watchlist.json");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");  
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  	response.render("index", { title: "Anime Watchlist" });
});

function loadWatchlist() {
	const data = fs.readFileSync(watchlistPath, "utf-8");
	return JSON.parse(data);
}

function saveWatchlist(list) {
	fs.writeFileSync(watchlistPath, JSON.stringify(list, null, 2 ));
}

app.listen(port, () => {
  	console.log(`Listening on http://localhost:${port}`);
});

app.get("/search", async(request, response) => {
  	const query = request.query.searchAnime;

	if(!query) {
		return response.redirect("/");
	}

	try {
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

	// Cleaned anime title to remove extra keywords from the title
	function normalizeAnimeTitle(title) {
		return title
			.replace(/Season.*/i, "")
			.replace(/3rd|2nd|1st/gi, "")
			.replace(/\(.*?\)/g, "")
			.trim();
	}

	try {
		const apiResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeID}`);
		const responseData = await apiResponse.json();
		const anime = responseData.data;

		const cleanTitle = normalizeAnimeTitle(anime.title);

		let animeQuote = {
			content: null,
			character: null,
			error: false
		};
		try {
			const quoteResponse = await fetch(`https://api.animechan.io/v1/quotes/random?anime=${encodeURIComponent(cleanTitle)}`);
			const animeQuoteJson = await quoteResponse.json();

			if (animeQuoteJson && animeQuoteJson.data) {
				animeQuote.content = animeQuoteJson.data.content;
				animeQuote.character = animeQuoteJson.data.character.name;
			} else {
				animeQuote.error = true;
				animeQuote.content = "No quotes available for this anime.";
				animeQuote.character = "";
			}
		} catch (quoteError) {
			console.error("Quote fetch error:", quoteError);
			animeQuote.error = true;
			animeQuote.content = "No quotes available for this anime.";
			animeQuote.character = "";
		} 

		response.render("anime", {
			title: anime.title, anime, animeQuote
		});
	} catch (error) {
		console.error("Error fetching anime details:", error);
		response.status(500).send("Could not load anime details.");
	}
});

app.get("/watchlist", (request, response) => {
	const watchlist = loadWatchlist();

	response.render("watchlist", {
		title: "My Watchlist", watchlist
	});
});

app.post("/watchlist/add/:id", async(request, response) => {
	const animeID = request.params.id;
	const watchlist = loadWatchlist();

	if(watchlist.some(a => a.id == animeID))
	{
		return response.redirect("/watchlist");
	}

	try {
		const apiResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeID}`);
		const responseData = await apiResponse.json();
		const anime = responseData.data;

		const watchlistEntry = {
			id: anime.mal_id, 
			title: anime.title,
			image: anime.images.jpg.image_url
		};

		watchlist.push(watchlistEntry);
		saveWatchlist(watchlist);

		response.redirect("/watchlist");
	} catch (error) {
		console.error("Error adding to watchlist: ", error);
		response.status(500).send("Could not add anime to watchlist.");
	}
});

app.post("/watchlist/remove/:id", (request, response) => {
	const animeID = request.params.id;
	let watchlist = loadWatchlist();

	watchlist = watchlist.filter(anime => anime.id != animeID);

	saveWatchlist(watchlist);
	response.redirect("/watchlist");
})