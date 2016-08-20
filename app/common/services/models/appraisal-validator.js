
export function isComplete(appraisal) {
  const { generalInfo, exteriorColor, interiorColor, mileage, ratings, media } = appraisal;

  const generalInfoValid = generalInfo &&
            generalInfo.vin && generalInfo.vin.length > 0 &&
            generalInfo.year && !isNaN(generalInfo.year) &&
            generalInfo.make && generalInfo.make.length > 0 &&
            generalInfo.model && generalInfo.model.length > 0 &&
            generalInfo.styleId && generalInfo.styleId.length > 0;

  const colorValid = (color) => color &&
            color.name && color.name.length > 0 &&
            color.id && color.id.length > 0 &&
            color.colorChips;

  const ratingsValid = ratings &&
            ratings.paint && !isNaN(ratings.paint) &&
            ratings.body && !isNaN(ratings.body) &&
            ratings.interior && !isNaN(ratings.interior) &&
            ratings.tires && !isNaN(ratings.tires);

  const mediaValid = media && media.length === 24;

  return generalInfoValid &&
            colorValid(exteriorColor) &&
            colorValid(interiorColor) &&
            mileage && !isNaN(mileage) &&
            ratingsValid &&
            mediaValid;
}
