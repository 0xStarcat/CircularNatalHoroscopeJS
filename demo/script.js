import moment from 'moment-timezone'
import Origin from '../src/Origin'
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
      year: timestamp.year(),
      month: timestamp.month(),
      date: timestamp.date(),
      hour: timestamp.hours(),
      minute: timestamp.minutes(),
      latitude: this.latitudeInput.value,
      longitude: this.longitudeInput.value
    })

    const horoscope = new Horoscope({
      origin: locationTimeData
    })

    this.midheavenElement.innerHTML = `${horoscope.midheaven} || ${dmsString(decimalDegreesToDMS(horoscope.midheaven))} || ${signDecimalDegrees(horoscope.midheaven)} || ${signDMS(horoscope.midheaven)}`

    this.ascendentElement.innerHTML = `${horoscope.ascendent} || ${dmsString(decimalDegreesToDMS(horoscope.ascendent))} || ${signDecimalDegrees(horoscope.ascendent)} || ${signDMS(horoscope.ascendent)}`
  }
}


new DemoApp()
