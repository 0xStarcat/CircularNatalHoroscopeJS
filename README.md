# Western Horoscope JS

This project exists with the intention to make western astrological horoscope creation free, readily available, and easy to access for anyone who can interact with Javascript. By **horoscope**, we're talking about astrological **birth charts**. **Not  horoscope readings** or **interpretations**.

Example Chart:

![Natal Chart Example](public/natal-chart.svg)

The goal is to allow someone to:

1) Enter a calendar date + time and latitude/longitude coordinates for a position on the planet Earth.

2) Receive:

  => ~~Calculated SunSign from Tropical, Sidereal, and IAU Astronomical zodiacs~~

  => ~~the calculated major angles (`ascendant` and `Midheaven (MC)`) for a given datetime and origin~~

  => the positions for all major bodies as they relate to the ecliptic for a given datetime and origin (`Sun`, `Moon`, `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto`)

  => the cusps of each astrological sign as they relate to the 2D ecliptic chart for a given datetime, origin, and a particular house system.

  => ~~the cusps of each house within multiple house systems.~~ (Placidus, Koch, Topocentric, Regiomontanus, Whole Sign, and Equal House added.

  => A list containing the sign each angle, major body, and house occupy.

  => A list containing all the computed aspects of all major bodies.

  => A data format that interfaces with a frontend library (maybe this one https://github.com/Kibo/AstroChart or a custom one) for creating the actual charts.

## Planned work

Right now, this is a work in progress. Progress is marked off by items above being ~~struck out~~.

I'm open to requests for house systems. I'm currently stopped at 6 - we have 2 "modern" systems (Topocentric, Koch), 2 "medieval" systems (Placidus, Regiomontanus), and 2 "ancient" systems (Whole Sign, Equal House). My formula resource "An Astrological House Formulary" by Michael P. Munkasey has many more house formulas I can implement if wanted. Hopefully I covered the most popular ones.

## Installation

If installing from a package manager (NPM, Yarn, etc), run the following command in terminal:

```
npm install western-horoscope-js

// or

yarn add western-horoscope-js
```

If installing from source, the main file can be found at `dist/main.bundle.js` and included in your codebase.

## Development

Install node modules

```
npm install

// or

yarn install
```

Run tests with

```
npm test

// or

yarn test
```


## Building

This package uses webpack to produce a javascript bundle. If modifying this code, a new bundle can be built with the following command:

```
npm run build

// or

yarn run build
```

## Demo

A small HTML implementation demo is provided.

To view, build the demo files locally with:

`npm run build`

and then open `dist/demo.html` in a browser.
