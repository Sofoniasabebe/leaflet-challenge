# leaflet-challenge

# 🌍 Earthquake Data Visualization Map

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, the task was to develope a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The following tasks were completed to achive the goal:

1. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I visited the USGS GeoJSON page and chose the weekly dataset to visualize. 

2. Using Leaflet, I created a map that plots all the earthquakes from the dataset based on their longitude and latitude. The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color. 

The visualization includes popups that provide additional information about the earthquake when its associated marker is clicked. Specifically, each point has a tooltip with the magnitude, the location and depth. 

A legend was created that provides context for the map data.

# Summary 

This project is an interactive web map that visualizes **real-time earthquake data** from the [USGS Earthquake Feed](https://earthquake.usgs.gov/). Built using **Leaflet.js** and **D3.js**, it allows users to explore seismic activity across the globe with meaningful visual cues.

## 📊 Features

- 🗺️ Interactive map built with **Leaflet.js**
- 🔴 Earthquake markers sized by **magnitude**
- 🎨 Color-coded by **depth** using a red–green scale
- 📍 Popups show **magnitude**, **depth**, and **location**
- 📘 Legend to interpret depth visually
- ⚡ Live GeoJSON data from **USGS**

## 🎨 Depth Color Scale

| Depth Range (km) | Color       |
|------------------|-------------|
| 0–10             | `#98ee00` (Lime Green)  
| 10–30            | `#d4ee00` (Lime Yellow) 
| 30–50            | `#eecc00` (Golden Yellow)
| 50–70            | `#ee9c00` (Amber)
| 70–90            | `#ea822c`  (Burnt Orange)
| >90              | `#ea2c2c` (Red)  

## 🧰 Technologies Used

- [Leaflet.js](https://leafletjs.com/) for map rendering
- [D3.js](https://d3js.org/) for data handling
- [USGS Earthquake GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)




**Reference**

*Dataset created by the United States Geological SurveyLinks to an external site.*
