import { getAscendant, getMidheavenSun } from "../src/utilities/astronomy";
import { Origin, Horoscope } from "../src";
describe("getAscendant", () => {
  it("returns correct value 0 ", () => {
    // from astronomical algorithims pg 99 ex 14.a
    const latitude = 51.0;
    const localSiderealTime = 75.0;
    const obliquityEcliptic = 23.44;
    expect(
      getAscendant({ latitude, localSiderealTime, obliquityEcliptic })
    ).toEqual(169.35830480234677);
  });

  it("returns correct value 1 ", () => {
    const latitude = 40.72;
    const localSiderealTime = 25.96;
    expect(getAscendant({ latitude, localSiderealTime })).toEqual(
      129.6067302512891
    );
  });

  it("returns correct value 2", () => {
    const latitude = 42.37;
    const localSiderealTime = 95.7499998542;
    // 7/18/1981 11:22am cambridge ma
    expect(getAscendant({ latitude, localSiderealTime })).toEqual(
      184.4906041740967
    );
  });

  it("returns correct value 3", () => {
    const latitude = -33.47;
    const localSiderealTime = 121.88288750336505;
    expect(getAscendant({ latitude, localSiderealTime })).toEqual(
      225.66189024232585
    );
  });

  it("returns correct value 4", () => {
    const latitude = 40.65871;
    // 3/25/89 @ 3:39 -5 EST
    const localSiderealTime = 238.89506391854957;

    expect(getAscendant({ latitude, localSiderealTime })).toEqual(
      310.67600948149834 // aquarius
    );
  });
});

describe("getMidheavenSun", () => {
  it("returns correct value 0 ", () => {
    // from astronomical algorithims pg 99 ex 14.a
    const localSiderealTime = 75.0;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(76.18812144037025);
  });

  it("returns correct value 1 ", () => {
    const localSiderealTime = 25.96;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(27.95252421570757);
  });

  it("returns correct value 2", () => {
    const localSiderealTime = 95.7499998542;
    // 7/18/1981 11:22am cambridge ma
    expect(getMidheavenSun({ localSiderealTime })).toEqual(95.27842395182506);
  });

  it("returns correct value 3", () => {
    const localSiderealTime = 359.79954708891455;
    // 4/30/1995 10:10am santiago, chile
    expect(getMidheavenSun({ localSiderealTime })).toEqual(359.781522892123);
  });

  it("returns correct value 1/1/2000 0:00 cambridge", () => {
    const localSiderealTime = 104.0731379442;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(102.95291932480757);
  });

  it("returns correct value 1/1/2000 1:00 cambridge", () => {
    const localSiderealTime = 119.1142065284;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(117.06575981770328);
  });

  it("returns correct value 1/1/2000 2:00 cambridge", () => {
    const localSiderealTime = 134.1552751127;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(131.69584369952577);
  });

  it("returns correct value 1/1/2000 3:00 cambridge", () => {
    const localSiderealTime = 149.1927931006;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(146.97985956505795);
  });

  it("returns correct value 1/1/2000 4:00 cambridge", () => {
    const localSiderealTime = 164.2374124492;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(162.89963028380498);
  });

  it("returns correct value 1/1/2000 5:00 cambridge", () => {
    const localSiderealTime = 179.2784810334;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(179.21361116033938);
  });

  it("returns correct value 1/1/2000 6:00 cambridge", () => {
    const localSiderealTime = 194.3195497858;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(195.5472452579745);
  });

  it("returns correct value 1/1/2000 7:00 cambridge", () => {
    const localSiderealTime = 209.36061837;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(211.51457401389962);
  });

  it("returns correct value 1/1/2000 8:00 cambridge", () => {
    const localSiderealTime = 224.4016869542;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(226.86697957273918);
  });

  it("returns correct value 1/1/2000 9:00 cambridge", () => {
    const localSiderealTime = 239.4427557066;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(241.55629035295874);
  });

  it("returns correct value 1/1/2000 10:00 cambridge", () => {
    const localSiderealTime = 254.4838242908;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(255.70928357641787);
  });

  it("returns correct value 1/1/2000 11:00 cambridge", () => {
    const localSiderealTime = 269.524892875;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(269.5640876085488);
  });

  it("returns correct value 1/1/2000 12:00 cambridge", () => {
    const localSiderealTime = 284.5659616273;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(283.40950386091356);
  });

  it("returns correct value 1/1/2000 13:00 cambridge", () => {
    const localSiderealTime = 299.6070302116;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(297.5358013408137);
  });

  it("returns correct value 1/1/2000 14:00 cambridge", () => {
    const localSiderealTime = 314.6480987958;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(312.18596716004777);
  });

  it("returns correct value 1/1/2000 15:00 cambridge", () => {
    const localSiderealTime = 329.6891675481;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(327.495803811865);
  });

  it("returns correct value 1/1/2000 16:00 cambridge", () => {
    const localSiderealTime = 344.7302361324;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(343.4296397118203);
  });

  it("returns correct value 1/1/2000 17:00 cambridge", () => {
    const localSiderealTime = 359.7713047166;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(359.7507410978641);
  });

  it("returns correct value 1/1/2000 18:00 cambridge", () => {
    const localSiderealTime = 14.8123734689;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(16.078072862279782);
  });

  it("returns correct value 1/1/2000 19:00 cambridge", () => {
    const localSiderealTime = 29.8534420531;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(32.02815405551348);
  });

  it("returns correct value 1/1/2000 20:00 cambridge", () => {
    const localSiderealTime = 44.8945106374;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(47.3585007167776);
  });

  it("returns correct value 1/1/2000 21:00 cambridge", () => {
    const localSiderealTime = 59.9355793897;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(62.02744091065722);
  });

  it("returns correct value 1/1/2000 22:00 cambridge", () => {
    const localSiderealTime = 74.9766479739;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(76.16646612540308);
  });

  it("returns correct value 1/1/2000 23:00 cambridge", () => {
    const localSiderealTime = 90.0177165582;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(90.01625494311583);
  });

  it("returns correct value - LST 0", () => {
    const localSiderealTime = 0;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(0);
  });

  it("returns correct value - LST 90", () => {
    const localSiderealTime = 90;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(90);
  });

  it("returns correct value - LST 179", () => {
    const localSiderealTime = 179;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(178.9101025984246);
  });

  it("returns correct value - LST 180", () => {
    const localSiderealTime = 180;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(180);
  });

  it("returns correct value - LST 181", () => {
    const localSiderealTime = 181;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(181.0898974015754);
  });

  it("returns correct value - LST 270", () => {
    const localSiderealTime = 270;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(270);
  });

  it("returns correct value - LST 359", () => {
    const localSiderealTime = 359;
    expect(getMidheavenSun({ localSiderealTime })).toEqual(358.9101025984246);
  });
});
