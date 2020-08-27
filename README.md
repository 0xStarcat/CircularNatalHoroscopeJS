# Circular Natal Horoscope JS

By **horoscope**, we're talking about astrological **birth charts**. **Not  horoscope readings** or **interpretations**.

Example Chart:

![Natal Chart Example](public/natal-chart.svg)

The goal is to allow someone to:

1) Enter a calendar date + time and latitude/longitude coordinates for a position on the planet Earth.

2) And receive a javascript class that interfaces with a frontend library (maybe this one https://github.com/Kibo/AstroChart or a custom one) for creating the actual charts.

## Work in Progress

=> ~~Calculated SunSign from Tropical, Sidereal, and IAU Astronomical zodiacs~~

=> ~~the calculated major angles (`ascendant` and `Midheaven (MC)`) for a given datetime and origin~~

=> ~~the positions for all major bodies as they relate to the ecliptic for a given datetime and origin (`Sun`, `Moon`, `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto`)~~

=> ~~Positions of Lunar Nodes, Lilith~~

=> Positions of the lots (Fortune, Spirit, Eros, etc)

=> ~~Data for retrograde planets~~

=> ~~the cusps of each astrological sign as they relate to the 2D ecliptic chart for a given datetime, origin, and a particular house system.~~

=> ~~the cusps of each house within multiple house systems.~~ (Placidus, Koch, Topocentric, Regiomontanus, Whole Sign, and Equal House added.

=> ~~Data containing the sign major body, and house occupy~~.

=> ~~A list containing all the computed major and minor aspects of all bodies / points / angles.~~

=> ~~Capacity for language translations~~

## Future work

- I'm open to requests for house systems. I'm currently stopped at 6 - we have 2 "modern" systems (Topocentric, Koch), 2 "medieval" systems (Placidus, Regiomontanus), and 2 "ancient" systems (Whole Sign, Equal House). My formula resource "An Astrological House Formulary" by Michael P. Munkasey has many more house formulas I can implement if wanted. Hopefully I covered the most popular ones.

## Implementation / Use

1. Get the Origin

```js
import Origin from "./src/Origin";


//////////
// Origin
//////////
// This class automatically derives the local timezone from latitude/longitude coordinates
// and calculates UTC time with respect to timezone and historical daylight savings time.
// Only works for C.E. date (> 0).
/////////
// * int year: value >= 0 C.E.
// * int month: (0 = january ...11 = december)
// * int date: (1...31)
// * int hours = local time - hours value (0...23)
// * int minute = local time - minute value (0...59)
// * float latitude = latitude in decimal format (-90.00...90.00)
// * float longitude = longitude in decimal format (-180.00...180.00)

// December 1st, 2020 - 430pm
const origin = new Origin({
      year: 2020,
      month: 11, // 0 = January, 11 = December!
      date: 1,
      hour: 16,
      minute: 30,
      latitude: 40.00
      longitude: -70.00
    });

```

2. Configure your horoscope results

```js
import Horoscope from "./src/Horoscope";
//////////
// Horoscope
//////////
// This class contains horoscope chart calculations
/////////
// * Origin origin: instance of the Origin class
// * string houseSystem: one of the following: ['placidus', 'koch', 'whole-sign', 'equal-house', 'regiomontanus', 'topocentric'] - full list validated in self.HouseSystems
// * string zodiac: one of the following: ['sidereal', 'tropical'] - full list validated self.ZodiacSystems
// * array aspectPoints = an array containing all or none of the strings "bodies", "points", or "angles" to determine which starting points will be used in aspect generation 
// * array aspectWithPoints = an array containing all or none of the strings "bodies", "points", or "angles" to determine ending points will be used in aspect generation
// * array aspectTypes = an array containing all or none of the following: "major", "minor", "conjunction", "opposition", etc to determine which aspects to calculate.
// * object customOrbs = an object with specific keys set to override the default orbs and set your own for aspect calculation.
// * string language = the language code (en, es, etc) which will return labels and results in a specific language, if configured.
//
// *NOTE: "bodies" = planets, "points" = lunar nodes / lilith, "angles" = ascendant / midheaven
// *NOTE: You can also pass in individual bodies, points, or angles into aspectPoints or aspectWithPoints
// * example: { aspectPoints: ["sun"], aspectWithPoints: ["moon"], aspectTypes: ["major", "quincrux"] } 
// * will only calculate sun to moon major or quincrux aspects if they exist
// * All usable keys found in ./src/constant.js under BODIES, POINTS, ANGLES


const horoscope = new Horoscope({
      origin: new Origin({...}),
      houseSystem: "whole-sign",
      zodiac: "tropical",
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor"],
      customOrbs: {},
      language: 'en'
    });

```

2b. (optional) Set custom orb degrees for aspects. Default orbs are found in `./src/constants.js`


```js
const customOrbs = {
      conjunction: 8,
      opposition: 8,
      trine: 8,
      square: 7,
      sextile: 6,
      quincunx: 5,
      quintile: 1,
      septile: 1,
      "semi-square": 1,
      "semi-sextile": 1,
    };


const horoscope = new Horoscope({
      origin: new Origin({...}),
      houseSystem: "whole-sign",
      zodiac: "tropical",
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor"],
      customOrbs: customOrbs,
      language: 'en'
    });

```


## Installation

If installing from source, clone this repo load the main file found at `dist/main.bundle.js`.

## Development

Install node modules

```
npm install

// or

yarn install
```

Then run

```

yarn start:dev
```

and any changes you make should be reflected in `dist/demo.html` if you open the file in a browser.

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

Please Note: The demo chart is not currently finalized or synced with the full functionality of this library. I'm currently working on writing / finding a different demo chart which can have the houses calibrated correctly based on the chosen system.

## Adding new languages

You can see how English and Spanish tokens are implemented in `src/utilities/language.js`. Copy the tokens for 1 language and add it to a key matching the ISO language code you want. Then, when you generate the horoscope, pass this code into the constructor:

```js
new Horoscope({language: "es"})
```

and your language will appear in the results under the `.label` keys supplied within `Sign`, `Aspect`, `Planet`, `House` objects.

## Sources / Special Thanks
- All formula for astronomical and astrological calculations are cited in the codebase.
- Special thanks to Mivion for their javascript implementation of Moshier's ephemeris https://github.com/mivion/ephemeris
- and to xErik for their work converting it into a module https://github.com/xErik/ephemeris-moshier/
- and Moshier for creating and sharing their C implementation of an ephemeris
