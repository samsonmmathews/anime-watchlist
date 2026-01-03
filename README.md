<div align="center">

# Anime Watchlist

A full-stack **Anime Watchlist** application built with **Node.js, Express, Pug, and MongoDB**.  
Search anime, explore details, and maintain a personal watchlist with persistent storage.  
Designed with scalability in mind, with UI and UX enhancements planned for future iterations.

[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-Framework-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.txt)


> Live website is avaialable at:
> [https://anime-watchlist-iv22.onrender.com](https://anime-watchlist-iv22.onrender.com)

</div>

## 🍱 Overview

The **Anime Watchlist** app helps users discover and manage anime titles effortlessly:

- Search anime using the **Jikan API** (MyAnimeList data)
- View anime details including rating, image, and synopsis
- Add or remove anime from a **personal watchlist**
- Store watchlist data persistently using **MongoDB**

This project focuses on **clean server-side rendering**, structured routing, and API-driven content.

## ✨ Features

### Current Features
- 🔎 **Anime Search** - Fetch anime data using the Jikan API  
- 🃏 **Detailed Anime Cards** - Title, poster, rating, and synopsis  
- 🗂 **Personal Watchlist** - Add and remove anime easily  
- 💾 **Persistent Storage** - Watchlist saved in MongoDB  
- 🧩 **Server-Side Rendering** - Dynamic views using Pug templates  

### Planned Enhancements
- Advanced filtering and sorting options  
- Improved UI/UX with animations and skeleton loaders  
- Pagination for large search results  
- Enhanced watchlist management features  

## ⚙️ Tools & Technologies

- **Node.js** - Runtime environment
- **Express.js** - Backend framework
- **Pug** - Server-side templating engine
- **MongoDB** - Database for watchlist persistence
- **CSS** - Styling and layout
- **Jikan API** - Anime data source (MyAnimeList)

## 🛠️ Project Structure

```
anime-watchlist/
│
├── public/               # CSS and static assets
├── routes/               # Express route handlers
├── views/                # Pug templates
│   ├── layout.pug
│   ├── index.pug
│   ├── dashboard.pug
│   └── search.pug
├── server.js             # Application entry point
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
└── LICENSE               # MIT License file
```

## 📈 Benefits

- Practice full-stack development with Node and Express
- Learn server-side rendering with Pug
- Work with external APIs and asynchronous data
- Implement CRUD operations with MongoDB
- Build a scalable project foundation for future UI/UX upgrades

## 🧠 Lessons Learned

- Structuring Express routes for scalability
- Integrating third-party APIs effectively
- Managing persistent data with MongoDB
- Rendering dynamic content using Pug templates
- Separating concerns between frontend, backend, and data layers

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE.txt) file for details.


