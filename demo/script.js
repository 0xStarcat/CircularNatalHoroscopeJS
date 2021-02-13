import moment from "moment-timezone";

import { Origin, Horoscope } from "../src/index.js";
import { Chart } from "../lib/astrochart-2.0.0.min.js";

class DemoApp {
  constructor() {
    this.form = document.querySelector("#form");
    this.chart = document.querySelector("#chart");
    this.dateInput = document.querySelector("#date");
    this.timeInput = document.querySelector("#time");
    this.latitudeInput = document.querySelector("#latitude");
    this.longitudeInput = document.querySelector("#longitude");
    this.houseSystemSelect = document.querySelector("#houseSystem");
    this.zodiacSystemSelect = document.querySelector("#zodiacSystem");
    this.languageSelect = document.querySelector("#language-select");

    this.sunSignElement = document.querySelector("#sunsign");
    this.midheavenElement = document.querySelector("#midheaven");
    this.ascendantElement = document.querySelector("#ascendant");
    this.housesTableElement = document.querySelector("#houses");
    this.zodiacTableElement = document.querySelector("#zodiacCusps");
    this.bodiesTable = document.querySelector("#bodies");
    this.pointsTable = document.querySelector("#points");
    this.anglesTable = document.querySelector("#angles");

    this.aspectsTable = document.querySelector("#aspects");
    this.aspectsMajorInput = document.querySelector("#aspect-level-major");
    this.aspectsMinorInput = document.querySelector("#aspect-level-minor");

    this.majorAspectSection = document.querySelector("#major-aspect-inputs");
    this.minorAspectSection = document.querySelector("#minor-aspect-inputs");

    this.displayDateTime = this.displayDateTime.bind(this);
    this.loadHouseSystemSelect = this.loadHouseSystemSelect.bind(this);
    this.loadZodiacSystemSelect = this.loadZodiacSystemSelect.bind(this);
    this.loadAspectInputs = this.loadAspectInputs.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.loadUI = this.loadUI.bind(this);
    this.loadTableTitles = this.loadTableTitles.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    // this.displayDateTime()
    this.loadLanguageSelect();
    this.loadUI();
    this.languageSelect.addEventListener("change", this.handleLanguageChange);
    this.form.addEventListener("submit", this.handleSubmit);
  }

  loadUI() {
    this.loadHouseSystemSelect();
    this.loadZodiacSystemSelect();
    this.loadAspectInputs();
    this.loadTableTitles();
  }

  handleLanguageChange() {
    this.loadUI();
    this.handleSubmit();
  }

  loadTableTitles() {
    const language = this.languageSelect.value;
    const zTHeadTH = this.zodiacTableElement.querySelectorAll("th");
    const hTHeadTH = this.housesTableElement.querySelectorAll("th");
    const bTHeadTH = this.bodiesTable.querySelectorAll("th");
    const pTHeadTH = this.pointsTable.querySelectorAll("th");
    const aTHeadTH = this.anglesTable.querySelectorAll("th");

    Horoscope.ZodiacLabels(language).forEach((zodiac, index) => {
      zTHeadTH[index + 1].innerHTML = zodiac.label;
    });

    Horoscope.HouseLabels(language).forEach((house, index) => {
      hTHeadTH[index + 1].innerHTML = house.label;
    });

    Horoscope.CelestialLabels(language)
      .filter((object) => object.type === "body")
      .forEach((object, index) => {
        bTHeadTH[index + 1].innerHTML = object.label;
      });

    Horoscope.CelestialLabels(language)
      .filter((object) => object.type === "point")
      .forEach((object, index) => {
        pTHeadTH[index + 1].innerHTML = object.label;
      });

    Horoscope.CelestialLabels(language)
      .filter((object) => object.type === "angle")
      .forEach((object, index) => {
        aTHeadTH[index + 1].innerHTML = object.label;
      });
  }

  displayDateTime() {
    const today = moment(new Date());
    this.dateInput.value = today.format("YYYY-MM-DD");
    this.timeInput.value = today.format("HH:mm:00");
  }

  loadLanguageSelect() {
    this.languageSelect.innerHTML = "";
    Horoscope.Languages().forEach((language) => {
      var opt = document.createElement("option");
      opt.value = language.value;
      opt.appendChild(document.createTextNode(language.label));
      this.languageSelect.appendChild(opt);
    });

    if (!this.languageSelect.value) {
      this.languageSelect.value = "en";
    }
  }

  loadHouseSystemSelect() {
    const language = this.languageSelect.value;
    this.houseSystemSelect.innerHTML = "";
    Horoscope.HouseSystems(language).forEach((system) => {
      var opt = document.createElement("option");
      opt.value = system.value;
      opt.appendChild(document.createTextNode(system.label));
      this.houseSystemSelect.appendChild(opt);
    });

    this.houseSystemSelect.value = "placidus";
  }

  loadZodiacSystemSelect() {
    const language = this.languageSelect.value;
    this.zodiacSystemSelect.innerHTML = "";
    Horoscope.ZodiacSystems(language).forEach((system) => {
      const opt = document.createElement("option");
      opt.value = system.value;
      opt.appendChild(document.createTextNode(system.label));
      this.zodiacSystemSelect.appendChild(opt);
    });

    this.zodiacSystemSelect.value = "tropical";
  }

  loadAspectInputs() {
    const language = this.languageSelect.value;
    this.majorAspectSection.innerHTML = "";
    this.minorAspectSection.innerHTML = "";

    const majorAspects = Horoscope.AspectLabels(language).filter((aspect) => {
      return aspect.level === "major";
    });

    const minorAspects = Horoscope.AspectLabels(language).filter((aspect) => {
      return aspect.level === "minor";
    });

    const aspectInputEl = (aspect) => {
      return `<label>${aspect.label} (${aspect.angle}°)</label>
                         <input class="form-control" id="${aspect.key}-orb" type="number" step="any" min="0" max="12" value="${aspect.defaultOrb}"></input>`;
    };

    majorAspects.forEach((aspect) => {
      const inputContainer = document.createElement("div");
      inputContainer.class = "form-group";
      inputContainer.innerHTML = aspectInputEl(aspect);

      this.majorAspectSection.appendChild(inputContainer);
    });

    minorAspects.forEach((aspect) => {
      const inputContainer = document.createElement("div");
      inputContainer.class = "form-group";
      inputContainer.innerHTML = aspectInputEl(aspect);

      this.minorAspectSection.appendChild(inputContainer);
    });
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    const timestamp = moment(`${this.dateInput.value} ${this.timeInput.value}`);
    const origin = new Origin({
      year: timestamp.year(),
      month: timestamp.month(),
      date: timestamp.date(),
      hour: timestamp.hours(),
      minute: timestamp.minutes(),
      latitude: this.latitudeInput.value,
      longitude: this.longitudeInput.value,
    });

    const customOrbs = {
      conjunction: document.querySelector("#conjunction-orb").value,
      opposition: document.querySelector("#opposition-orb").value,
      trine: document.querySelector("#trine-orb").value,
      square: document.querySelector("#square-orb").value,
      sextile: document.querySelector("#sextile-orb").value,
      quincunx: document.querySelector("#quincunx-orb").value,
      quintile: document.querySelector("#quintile-orb").value,
      septile: document.querySelector("#septile-orb").value,
      "semi-square": document.querySelector("#semi-square-orb").value,
      "semi-sextile": document.querySelector("#semi-sextile-orb").value,
    };

    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: this.houseSystemSelect.value,
      zodiac: this.zodiacSystemSelect.value,
      aspectTypes: [
        this.aspectsMajorInput.checked ? "major" : undefined,
        this.aspectsMinorInput.checked ? "minor" : undefined,
      ].filter((e) => e),
      customOrbs: customOrbs,
      language: this.languageSelect.value,
    });

    console.log(horoscope);

    this.sunSignElement.innerHTML = horoscope.SunSign.label;

    document.querySelector(
      "#midheaven-a"
    ).innerHTML = `${horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees}`;

    document.querySelector(
      "#midheaven-b"
    ).innerHTML = `${horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees}`;

    document.querySelector(
      "#midheaven-c"
    ).innerHTML = `${horoscope.Midheaven.Sign.label} ${horoscope.Midheaven.ChartPosition.Ecliptic.ArcDegreesFormatted30}`;

    document.querySelector(
      "#ascendant-a"
    ).innerHTML = `${horoscope.Ascendant.ChartPosition.Horizon.DecimalDegrees}`;

    document.querySelector(
      "#ascendant-b"
    ).innerHTML = `${horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees}`;

    document.querySelector(
      "#ascendant-c"
    ).innerHTML = `${horoscope.Ascendant.Sign.label} ${horoscope.Ascendant.ChartPosition.Ecliptic.ArcDegreesFormatted30}`;

    horoscope.Houses.forEach((cusp, index) => {
      document.querySelector(`#house-${index + 1}a`).innerHTML =
        cusp.ChartPosition.StartPosition.Horizon.DecimalDegrees;

      document.querySelector(`#house-${index + 1}b`).innerHTML =
        cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;

      document.querySelector(
        `#house-${index + 1}-sign`
      ).innerHTML = `${cusp.Sign.label}`;
    });

    horoscope.ZodiacCusps.forEach((cusp, index) => {
      document.querySelector(`#zodiac-${index + 1}`).innerHTML =
        cusp.ChartPosition.Horizon.DecimalDegrees;
      document.querySelector(`#zodiac-${index + 1}b`).innerHTML =
        cusp.ChartPosition.Ecliptic.DecimalDegrees;
    });

    horoscope.CelestialBodies.all.forEach((result) => {
      const ecEl = document.querySelector(`#${result.key}-a`);
      if (ecEl)
        ecEl.innerHTML = result.ChartPosition.Horizon.DecimalDegrees.toFixed(4);

      const zEl = document.querySelector(`#${result.key}-b`);
      if (zEl)
        zEl.innerHTML = result.ChartPosition.Ecliptic.DecimalDegrees.toFixed(4);

      const dmsEl = document.querySelector(`#${result.key}-dms`);
      if (dmsEl)
        dmsEl.innerHTML = `${result.Sign.label} ${result.ChartPosition.Ecliptic.ArcDegreesFormatted30}`;

      const retroEl = document.querySelector(`#${result.key}-retro`);
      if (retroEl)
        retroEl.innerHTML = `${result.isRetrograde ? result.isRetrograde : ""}`;

      const houseEl = document.querySelector(`#${result.key}-house`);
      if (houseEl) houseEl.innerHTML = `${result.House.label}`;
    });

    Object.keys(horoscope.CelestialPoints).forEach((key) => {
      const result = horoscope.CelestialPoints[key];

      const ecEl = document.querySelector(`#${key.toLowerCase()}-a`);
      if (ecEl)
        ecEl.innerHTML = result.ChartPosition.Horizon.DecimalDegrees.toFixed(4);

      const zEl = document.querySelector(`#${key.toLowerCase()}-b`);
      if (zEl)
        zEl.innerHTML = result.ChartPosition.Ecliptic.DecimalDegrees.toFixed(4);

      const dmsEl = document.querySelector(`#${key.toLowerCase()}-dms`);
      if (dmsEl)
        dmsEl.innerHTML = `${result.Sign.label} ${result.ChartPosition.Ecliptic.ArcDegreesFormatted30}`;

      const houseEl = document.querySelector(`#${key.toLowerCase()}-house`);
      if (houseEl) houseEl.innerHTML = `${result.House.label}`;
    });

    const aspectsTableBody = this.aspectsTable.querySelector("tbody");
    aspectsTableBody.innerHTML = "";
    horoscope.Aspects.all.forEach((aspect) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${aspect.point1Label}</td>
        <td>${aspect.label}</td>
        <td>${aspect.point2Label}</td>
        <td>${aspect.orb}</td>
        <td>${aspect.orbUsed}</td>
        <td>${aspect.aspectLevelLabel}</td>
      `;
      aspectsTableBody.appendChild(tableRow);
    });

    const chartPlanets = Object.assign(
      {},
      ...horoscope.CelestialBodies.all.map((body) => {
        const key = body.key.charAt(0).toUpperCase() + body.key.slice(1);
        return { [key]: [body.ChartPosition.Ecliptic.DecimalDegrees] };
      })
    );

    const asc = horoscope.Ascendant.ChartPosition.Horizon.DecimalDegrees;
    const desc = (asc + 180) % 360;
    const mc = horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees;
    const ic =
      (horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees + 180) % 360;

    const chartCusps = horoscope.Houses.map((cusp) => {
      return cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
    });

    this.chart.innerHTML = "";
    const chart = new astrology.Chart(this.chart.id, 800, 800);
    const data = {
      planets: chartPlanets,
      cusps: chartCusps,
    };

    const radix = chart.radix(data);
    radix.addPointsOfInterest({ As: [asc], Mc: [mc], Ds: [desc], Ic: [ic] });
    radix.aspects();
  }
}

new DemoApp();
