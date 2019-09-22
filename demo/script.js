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

    this.midheavenElement = document.querySelector('#midheaven')
    this.ascendentElement = document.querySelector('#ascendent')

    this.displayDateTime = this.displayDateTime.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.displayDateTime()
    this.form.addEventListener('submit', this.handleSubmit)
  }

  displayDateTime() {
    const today = moment(new Date())
    this.dateInput.value = today.format('YYYY-MM-DD');
    this.timeInput.value = today.format('HH:mm:00')
  }

  handleSubmit(e) {
    e.preventDefault()
    const timestamp = moment(`${this.dateInput.value} ${this.timeInput.value}`)
    const locationTimeData = new Origin({
      year: timestamp.years(),
      month: timestamp.months(),
      date: timestamp.dates(),
      hour: timestamp.hours(),
      minute: timestamp.minutes(),
      latitude: this.latitudeInput.value,
      longitude: this.longitudeInput.value
    })

    const horoscope = new Horoscope({
      origin: locationTimeData
    })

    this.midheavenElement.innerHTML = `${horoscope.midheaven} || ${decimalDegreesToDMS(horoscope.midheaven).degrees} ${decimalDegreesToDMS(horoscope.midheaven).minutes}' ${decimalDegreesToDMS(horoscope.midheaven).seconds}''`

    this.ascendentElement.innerHTML = `${horoscope.ascendent} || ${decimalDegreesToDMS(horoscope.ascendent).degrees} ${decimalDegreesToDMS(horoscope.ascendent).minutes}' ${decimalDegreesToDMS(horoscope.ascendent).seconds}''`
  }
}


new DemoApp()
