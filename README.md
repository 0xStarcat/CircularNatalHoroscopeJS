# WesternAstrologyJS

This project exists with the intention to make western astrological horoscope creation free, readily available, and easy to access for anyone who can interact with Javascript. By horoscope, we're talking about astrological & birth charts. Not daily predictions (although you are certainly free to make them with these charts).

Example:

![Natal Chart Example](public/natal-chart.svg)

The goal is to allow someone to:

1) Enter a date + time and

2) Enter latitude/longitude coordinates for a position on the planet Earth

Then receive:

  => the calculated major angles (`Ascendant` and `Midheaven (MC)`)

  => the positions for all major bodies as they relate to the ecliptic (`Sun`, `Moon`, `Mercury`, `Venus`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Pluto`)

  => the positions of each astrological sign as it relates to the ecliptic (`Aries`, `Taurus`, `Gemini`, `Cancer`, `Leo`, `Virgo`, `Libra`, `Scorpio`, `Sagittarius`, `Capricorn`, `Aquarius`, `Pisces`)

  => the cusps of each house within the Placidus house system as it relates to the ecliptic (more house systems too!).

  => the computed constellation each major body occupies

  => the computed house position each major body occupies

  => the computed aspects of all major bodies
