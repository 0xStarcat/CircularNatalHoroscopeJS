# WesternAstrologyJS

This project exists with the intention to make western astrological horoscope creation free, readily available, and easy to access for anyone who can interact with Javascript. By **horoscope**, we're talking about astrological **birth charts**. **Not  horoscope readings** or **interpretations**.

Example Chart:

![Natal Chart Example](public/natal-chart.svg)

The goal is to allow someone to:

1) Enter a calendar date + time and latitude/longitude coordinates for a position on the planet Earth.

2) Receive:

  => the calculated major angles (`Ascendant` and `Midheaven (MC)`)

  => the positions for all major bodies as they relate to the ecliptic (`Sun`, `Moon`, `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto`)

  => the positions of each astrological sign as it relates to the ecliptic (`Aries`, `Taurus`, `Gemini`, `Cancer`, `Leo`, `Virgo`, `Libra`, `Scorpio`, `Sagittarius`, `Capricorn`, `Aquarius`, `Pisces`)

  => the cusps of each house within the Placidus house system as it relates to the ecliptic (more house systems too!).

  => the computed constellation each major body occupies

  => the computed house position each major body occupies

  => the computed aspects of all major bodies

## Installation

If installing from a package manager (NPM, Yarn, etc), run the following command in terminal:

```
npm install western-horoscope-js

// or

yarn add western-horoscope-js
```

If installing from source, the main file can be found at `dist/main.bundle.js` and included in your codebase.


## Building

This package uses webpack to produce a javascript bundle. If modifying this code, a new bundle can be built with the following command:

```
npm run build

// or

yarn run build
```

## Demo

A small HTML implementation demo is provided.

To view, open the file `dist/demo.html` in your browser.
