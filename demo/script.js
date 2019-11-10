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

    this.aspectsTable = document.querySelector('#aspects')
    this.aspectsMajor = document.querySelector('#aspect-level-major')
    this.aspectsMinor = document.querySelector('#aspect-level-minor')

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

    const customOrbs = {
      conjunction: document.querySelector('#conjunction-orb').value,
      opposition: document.querySelector('#opposition-orb').value,
      trine: document.querySelector('#trine-orb').value,
      square: document.querySelector('#square-orb').value,
      sextile: document.querySelector('#sextile-orb').value,
      quincunx: document.querySelector('#quincunx-orb').value,
      quintile: document.querySelector('#quintile-orb').value,
      septile: document.querySelector('#septile-orb').value,
      'semi-square': document.querySelector('#semi-square-orb').value,
      'semi-sextile': document.querySelector('#semi-sextile-orb').value,
    }

    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: this.houseSystemSelect.value,
      zodiac: this.zodiacSystemSelect.value,
      aspectTypes: [this.aspectsMajor.checked ? 'major' : undefined, this.aspectsMinor.checked ? 'minor' : undefined].filter(e => e),
      customOrbs: customOrbs
    })

    console.log(horoscope)

    this.sunSignElement.innerHTML = horoscope.SunSign.Name

    this.midheavenElement.innerHTML = `${horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees} || ${horoscope.Midheaven.Sign.Name} ${horoscope.Midheaven.ChartPosition.Ecliptic.ArcDegreesFormatted30}`

    this.ascendantElement.innerHTML = `${horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees} || ${horoscope.Ascendant.Sign.Name} ${horoscope.Ascendant.ChartPosition.Ecliptic.ArcDegreesFormatted30}`

    horoscope.Houses.forEach((cusp, index) => {
      document.querySelector(`#house-${index + 1}a`).innerHTML = cusp.ChartPosition.StartPosition.Horizon.DecimalDegrees

      document.querySelector(`#house-${index + 1}b`).innerHTML = cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees

      document.querySelector(`#house-${index + 1}-sign`).innerHTML = `${cusp.Sign.Name}`

    })

    horoscope.ZodiacCusps.forEach((cusp, index) => {
      document.querySelector(`#zodiac-${index + 1}`).innerHTML = cusp.ChartPosition.Horizon.DecimalDegrees
      document.querySelector(`#zodiac-${index + 1}b`).innerHTML = cusp.ChartPosition.Ecliptic.DecimalDegrees
    })

    horoscope.CelestialBodies.all.forEach(result => {
      const ecEl = document.querySelector(`#${result.key}-a`)
      if (ecEl) ecEl.innerHTML = result.ChartPosition.Horizon.DecimalDegrees.toFixed(4)

      const zEl = document.querySelector(`#${result.key}-b`)
      if (zEl) zEl.innerHTML = result.ChartPosition.Ecliptic.DecimalDegrees.toFixed(4)

      const dmsEl = document.querySelector(`#${result.key}-dms`)
      if (dmsEl) dmsEl.innerHTML = `${result.Sign.Name} ${result.ChartPosition.Ecliptic.ArcDegreesFormatted30}`

      const retroEl = document.querySelector(`#${result.key}-retro`)
      if (retroEl) retroEl.innerHTML = `${result.isRetrograde ? result.isRetrograde : ''}`

      const houseEl = document.querySelector(`#${result.key}-house`)
      if (houseEl) houseEl.innerHTML = `${result.House.Name}`
    })

    Object.keys(horoscope.CelestialPoints).forEach(key => {
      const result = horoscope.CelestialPoints[key]

      const ecEl = document.querySelector(`#${key.toLowerCase()}-a`)
      if (ecEl) ecEl.innerHTML = result.ChartPosition.Horizon.DecimalDegrees.toFixed(4)

      const zEl = document.querySelector(`#${key.toLowerCase()}-b`)
      if (zEl) zEl.innerHTML = result.ChartPosition.Ecliptic.DecimalDegrees.toFixed(4)

      const dmsEl = document.querySelector(`#${key.toLowerCase()}-dms`)
      if (dmsEl) dmsEl.innerHTML = `${result.Sign.Name} ${result.ChartPosition.Ecliptic.ArcDegreesFormatted30}`

      const houseEl = document.querySelector(`#${key.toLowerCase()}-house`)
      if (houseEl) houseEl.innerHTML = `${result.House.Name}`
    })

    const aspectsTableBody = this.aspectsTable.querySelector('tbody')
    aspectsTableBody.innerHTML = ''
    horoscope.Aspects.all.forEach(aspect => {
      const tableRow = document.createElement('tr')
      tableRow.innerHTML = `
        <td>${aspect.point1Key}</td>
        <td>${aspect.aspectLabel}</td>
        <td>${aspect.point2Key}</td>
        <td>${aspect.orb}</td>
        <td>${aspect.orbUsed}</td>
        <td>${aspect.aspectLevel}</td>
      `
      aspectsTableBody.appendChild(tableRow)
    })
  }
}


new DemoApp()
