import moment from 'moment-timezone'
import Origin from '../src/Origin'
import SunSign from '../src/SunSign'
import Horoscope from '../src/Horoscope'
import { decimalDegreesToDMS } from '../src/utilities/math'
import { dmsString, signDecimalDegrees, signDMS } from '../src/utilities/copy'

class DemoApp {
  constructor() {
    this.form = document.querySelector('#form')
    this.dateInput = document.querySelector('#date')
    this.timeInput = document.querySelector('#time')
    this.latitudeInput = document.querySelector('#latitude')
    this.longitudeInput = document.querySelector('#longitude')
    this.houseSystemSelect = document.querySelector('#houseSystem')

    this.sunSignElement = document.querySelector('#sunsign')
    this.midheavenElement = document.querySelector('#midheaven')
    this.ascendantElement = document.querySelector('#ascendant')
    this.housesElement = document.querySelector('#houses')

    this.displayDateTime = this.displayDateTime.bind(this)
    this.loadHouseSystemSelect = this.loadHouseSystemSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.displayDateTime()
    this.loadHouseSystemSelect()
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

    const sunSign = new SunSign({
      month: origin.utcTime.month(),
      date: origin.utcTime.date(),
      zodiac: "tropical"
    })

    this.sunSignElement.innerHTML = sunSign.sign.name

    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: this.houseSystemSelect.value
    })

    this.midheavenElement.innerHTML = `${horoscope.midheaven} || ${signDMS(horoscope.midheaven)}`

    this.ascendantElement.innerHTML = `${horoscope.ascendant} || ${signDMS(horoscope.ascendant)}`

    horoscope.houseCusps.forEach((cusp, index) => {
      document.querySelector(`#house-${index + 1}a`).innerHTML = cusp
      document.querySelector(`#house-${index + 1}b`).innerHTML = signDMS(cusp)
    })
  }
}


new DemoApp()
