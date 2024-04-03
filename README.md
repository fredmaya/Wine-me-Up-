# Project Title

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

My plan is to use MySQL and express in the server side. React, and maybe bootstrap in the front end.

### APIs

List any external sources of data that will be used in your app.

https://www.wine-searcher.com/trade/ws-api
https://sampleapis.com/api-list/wines
and maybe create my own

### Sitemap

5 pages:
Home, form, result, not found page and contact us:

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

Data base in the server side, or the API:

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
3 post requests: wine, food and appetizer.

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Does not include, its and open application.

## Roadmap

Sprint 1: DataBase and server side. It will help me to define how much data I would be working with and the possibilities of my application. 4days
Sprint 2: Front end functionality, API calls and event handlers. 3days
Sprint 3: styling. 5 days

## Nice-to-haves

I will try to find some extra APIs that can consider the wines available in Canada. I will also look for reviews in the suggested wine adding taste notes.

