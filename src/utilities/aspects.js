import { modulo, getModuloDifference, isDegreeWithinCircleArc } from "./math";
import { ASPECTS } from "../constants";
import Aspect from "../Aspect";

export const isAspect = (point1, point2, angle, orb) => {
  const computed = modulo(point2 - point1, 360);

  const low = modulo(angle - orb, 360);
  const high = modulo(angle + orb, 360);

  return isDegreeWithinCircleArc(low, high, computed, "[]");
};

export const getAspectData = (horoscope) => {
  const data = [...horoscope._aspectPoints, ...horoscope._aspectWithPoints].map(
    (point) => {
      const horoscopeData =
        horoscope.CelestialBodies[point] ||
        horoscope.CelestialPoints[point] ||
        horoscope.Angles[point];

      if (!horoscopeData)
        throw new Error(`Unable to match point: ${point} with horoscope data.`);

      return {
        key: point,
        point: horoscopeData.ChartPosition.Ecliptic.DecimalDegrees,
      };
    }
  );

  return {
    ...Object.assign({}, ...data.map((aspect) => ({ [aspect.key]: aspect }))),
  };
};

export const calculateOrb = (aspectAngle, maxOrb, point1, point2) => {

  // Calculates how close point2 is to the aspect angle from point1.
  // Ex: Point1 = 100 deg, Point2 = 161 deg, 
  // Sextile Aspect = 60 deg
  // => orb = 1 deg

  const difference = getModuloDifference(point1, point2)
  const orb = Math.abs(difference - aspectAngle)

  // let orb = getModuloDifference(point1, comparisonAngle)
  // if (aspectAngle > 0) orb = modulo(orb, aspectAngle)
  return parseFloat(orb.toFixed(4))
}

export const createAspects = (horoscope) => {
  const aspectData = getAspectData(horoscope);
  const aspectTypes = horoscope._aspectTypes;
  const aspectPoints = horoscope._aspectPoints;
  const aspectWithPoints = horoscope._aspectWithPoints;

  const aspects = [];
  const createdaspectTypes = {};
  const createdAspectPoints = {};

  aspectPoints.forEach((point1) => {
    aspectTypes.forEach((type) => {
      aspectWithPoints
        .filter((p) => p !== point1)
        .forEach((point2) => {
          if (!ASPECTS[type])
            throw new Error(`Could not find data for aspect: "${type}"`);
          const aspectObject = ASPECTS[type];
          const maxOrb =
            horoscope._customOrbs[type] || aspectObject.defaultOrb || 0;
          const point1Data = aspectData[point1];
          const point2Data = aspectData[point2];

          let orb, aspect;
          if (
            isAspect(
              point1Data.point,
              point2Data.point,
              aspectObject.angle,
              maxOrb
            )
          ) {
            orb = calculateOrb(aspectObject.angle, maxOrb, point1Data.point, point2Data.point)

            aspect = new Aspect({
              aspectKey: type,
              point1Key: point1,
              point2Key: point2,
              orb,
              orbUsed: maxOrb,
              language: horoscope._language,
            });
          } else if (
            isAspect(
              point2Data.point,
              point1Data.point,
              aspectObject.angle,
              maxOrb
            )
          ) {
            orb = calculateOrb(aspectObject.angle, maxOrb, point1Data.point, point2Data.point)

            aspect = new Aspect({
              aspectKey: type,
              point1Key: point1,
              point2Key: point2,
              orb,
              orbUsed: maxOrb,
              language: horoscope._language,
            });
          }

          if (!aspect) return;
          if (aspect) {
            if (
              aspect.point1Key === "northnode" &&
              aspect.point2Key === "southnode"
            )
              return; // no northnode-southnode aspect
            if (
              aspect.point1Key === "southnode" &&
              aspect.point2Key === "northnode"
            )
              return; // no southnode-northnode aspect
            if (
              aspect.point1Key === "ascendant" &&
              aspect.point2Key === "midheaven"
            )
              return; // no ascendant-midheaven aspect
            if (
              aspect.point1Key === "midheaven" &&
              aspect.point2Key === "ascendant"
            )
              return; // no midheaven-ascendant aspect
            if (
              aspects.find(
                (a) => a.point1Key === point2 && a.point2Key === point1
              )
            )
              return; // No duplicates

            aspects.push(aspect);

            if (Array.isArray(createdaspectTypes[type])) {
              createdaspectTypes[type].push(aspect);
            } else {
              createdaspectTypes[type] = [aspect];
            }

            if (Array.isArray(createdAspectPoints[point1])) {
              createdAspectPoints[point1].push(aspect);
            } else {
              createdAspectPoints[point1] = [aspect];
            }

            if (Array.isArray(createdAspectPoints[point2])) {
              createdAspectPoints[point2].push(aspect);
            } else {
              createdAspectPoints[point2] = [aspect];
            }
          }
        });
    });
  });

  return {
    all: aspects,
    types: createdaspectTypes,
    points: createdAspectPoints,
  };
};
