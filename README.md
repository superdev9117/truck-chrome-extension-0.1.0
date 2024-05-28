# TruckerPath Route Finder Chrome Extension

## Overview

TruckerPath Route Finder is a Chrome extension that adds a new column to the TruckerPath Load Board. This column contains links that, when clicked, open Google Maps with the route between the two destinations specified in the load details.

## Features

- Adds a "View Route" column to the TruckerPath Load Board.
- Each cell in the "Route" column contains a link to Google Maps displaying the route between the origin and destination of the load.
- A popup allows refreshing the routes.

## Build the Extension

- `npm install`

- `npm run build`

## Load the Extension into Chrome

- Open Chrome and navigate to `chrome://extensions/`.
- Enable "Developer mode" using the toggle in the top right.
- Click the "Load unpacked" button and select the `public` directory inside this project.