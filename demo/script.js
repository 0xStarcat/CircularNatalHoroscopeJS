import moment from 'moment-timezone'
import Origin from '../src/Origin'
import Horoscope from '../src/Horoscope'
import { decimalDegreesToDMS } from '../src/utilities/math'

class DemoApp {
  constructor() {
    this.form = document.querySelector('#form')
    this.dateInput = document.querySelector('#date')
    this.timeInput = document.querySelector('#time')
    this.latitudeInput = document.querySelector('#latitude')
    this.longitudeInput = document.querySelector('#longitude')
    this.houseSystemSelect = document.querySelector('#houseSystem')
    this.zodiacSystemSelect = document.querySelector('#zodiacSystem')

    this.sunSignElement = document.querySelector('#sunsign')
    this.midheavenElement = document.querySelector('#midheaven')
    this.ascendantElement = document.querySelector('#ascendant')
    this.housesElement = document.querySelector('#houses')
    this.zodiacCuspsElement = document.querySelector('#zodiacCusps')

    this.displayDateTime = this.displayDateTime.bind(this)
    this.loadHouseSystemSelect = this.loadHouseSystemSelect.bind(this)
    this.loadZodiacSystemSelect = this.loadZodiacSystemSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // this.displayDateTime()
    this.loadHouseSystemSelect()
    this.loadZodiacSystemSelect()
    this.form.addEventListener('submit', this.handleSubmit)
  }

  displayDateTime() {
    const today = moment(new Date())
    this.dateInput.value = today.format('YYYY-MM-DD');
    this.timeInput.value = today.format('HH:mm:00')
  }

  loadHouseSystemSelect() {
    Horoscope.HouseSystems.forEach(system => {
      var opt = document.createElement('option');
      opt.value = system
      opt.appendChild(document.createTextNode(system))
      this.houseSystemSelect.appendChild(opt)
    })

    this.houseSystemSelect.value = "placidus"
  }

  loadZodiacSystemSelect() {
    Horoscope.ZodiacSystems.forEach(system => {
      var opt = document.createElement('option');
      opt.value = system
      opt.appendChild(document.createTextNode(system))
      this.zodiacSystemSelect.appendChild(opt)
    })

    this.zodiacSystemSelect.value = "tropical"
  }

  handleSubmit(e) {
    e.preventDefault()
    const timestamp = moment(`${this.dateInput.value} ${this.timeInput.value}`)
    const origin = new Origin({
      year: timestamp.year(),
      month: timestamp.month(),
      date: timestamp.date(),
      hour: timestamp.hours(),
      minute: timestamp.minutes(),
      latitude: this.latitudeInput.value,
      longitude: this.longitudeInput.value
    })


    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: this.houseSystemSelect.value,
      zodiac: this.zodiacSystemSelect.value
    })

    console.log(horoscope)

    this.sunSignElement.innerHTML = horoscope.SunSign.Name

    this.midheavenElement.innerHTML = `${horoscope.Midheaven.Zodiac.DecimalDegrees} || ${horoscope.Midheaven.Sign.Name} ${horoscope.Midheaven.Zodiac.ArcDegreesFormatted30}`

    this.ascendantElement.innerHTML = `${horoscope.Ascendant.Zodiac.DecimalDegrees} || ${horoscope.Ascendant.Sign.Name} ${horoscope.Ascendant.Zodiac.ArcDegreesFormatted30}`

    horoscope.Houses.forEach((cusp, index) => {
      document.querySelector(`#house-${index + 1}a`).innerHTML = cusp.StartPosition.Ecliptic.DecimalDegrees

      document.querySelector(`#house-${index + 1}b`).innerHTML = cusp.StartPosition.Zodiac.DecimalDegrees

      document.querySelector(`#house-${index + 1}-sign`).innerHTML = `${cusp.Sign.Name}`

    })

    horoscope.ZodiacCusps.forEach((cusp, index) => {
      document.querySelector(`#zodiac-${index + 1}`).innerHTML = cusp.Ecliptic.DecimalDegrees
      document.querySelector(`#zodiac-${index + 1}b`).innerHTML = cusp.Zodiac.DecimalDegrees
    })

    horoscope.CelestialBodies.forEach(result => {
      const ecEl = document.querySelector(`#${result.key}-a`)
      if (ecEl) ecEl.innerHTML = result.Ecliptic.DecimalDegrees.toFixed(4)

      const zEl = document.querySelector(`#${result.key}-b`)
      if (zEl) zEl.innerHTML = result.Zodiac.DecimalDegrees.toFixed(4)

      const dmsEl = document.querySelector(`#${result.key}-dms`)
      if (dmsEl) dmsEl.innerHTML = `${result.Sign.Name} ${result.Zodiac.ArcDegreesFormatted30}`

      const houseEl = document.querySelector(`#${result.key}-house`)
      if (houseEl) houseEl.innerHTML = `${result.House.Name}`
  })
  }
}


new DemoApp()
