WINE ME UP!

## Overview

Wine Me UP is a website that helps people to find pairing ideas for their favorite wines, or suggest great wines to pair with their appetizers and/or dishes.

### Problem

Wine pairing can completely change the dining experience by enhance flavours and elevating the enjoyment of both food and the wine.
The idea of this application is to help users on selecting the perfect combination of wines and dishes, improving their culinary ventures.

### User Profile

The user would be a wine enthusiast looking for tips and suggestions to try new varieties of wines and dishes. Must be a 19years older.

### Features

The app will take users input about either their wine choice, or dish/appetizer and will output a suggestion for the missing element.

## Implementation

### Tech Stack

MySQL and express in the server side. React, and maybe bootstrap in the front end.

### APIs

List any external sources of data that will be used in your app.

https://www.wine-searcher.com/trade/ws-api
https://sampleapis.com/api-list/wines
and create my own

### Sitemap

3 pages:
Home, about us, cards.

### Data

Data base in the server side using MySQL

[
{
"winery": "Maselva",
"wine": "Emporda 2012",
"rating": {
"average": "4.9",
"location": "Spain\n·\nEmpordà",
"image": "image.jpg",
"id": 1
},

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

3 Get requests: wine, food and appetizer.


## Roadmap

Sprint 1: DataBase and server side.  2days
Sprint 2: Front end functionality, API calls and event handlers. 2days
Sprint 3: styling. 2days

## In Progress

Add some extra APIs that can consider the wines available in Canada and look for reviews in the suggested wine adding taste notes.
Add prompt to give the user custom food and appetizer suggestion.

