const resolveLegacyImageResources = (imageArray = []) => {
  const globalRE = /carrollgardens/gi;
  const retVal = imageArray
    .filter(item => item.angle && item.full && item.medium && item.small && item.thumb)
    .map(item => ({
      angle: item.angle,
      full: item.full.replace(globalRE, 'media').replace('.svc', '-svc'),
      medium: item.medium.replace(globalRE, 'media').replace('.svc', '-svc'),
      small: item.small.replace(globalRE, 'media').replace('.svc', '-svc'),
      thumb: item.thumb.replace(globalRE, 'media').replace('.svc', '-svc'),
    }));
  return retVal;
};

export const viewToDomain = (vm) => {
  const dm = {};
  dm.id = vm.id;
  dm.dealer = {
    dealerId: vm.dealerId,
    dealerType: 0 /* franchise = 0  indy = 1  wholesale = 2 */,
    dealerGroup: {},
    address: {},
    phoneNumbers: [],
  };
  dm.dateCreated = vm.dateCreated;
  dm.isTradeIn = vm.isTradeIn;
  dm.acv = vm.acv;
  dm.bidRequestsMade = vm.bidRequestsMade || 0;
  dm.recordings = vm.recordings;
  dm.vehicleBuildInfo = {
    vin: vm.generalInfo.vin,
    year: vm.generalInfo.year,
    make: vm.generalInfo.make,
    model: vm.generalInfo.model,
    style: vm.generalInfo.styleId,
    exteriorColor: vm.exteriorColor,
    interiorColor: vm.interiorColor,
    options: vm.options,
    equipment: vm.equipment,
    source: vm.generalInfo.source,
    categories: vm.categories,
  };
  dm.vehicleStateInfo = {
    mileage: vm.mileage,
    condition: {
      paint: vm.ratings && vm.ratings.paint,
      fitAndFinish: vm.ratings && vm.ratings.body,
      interior: vm.ratings && vm.ratings.interior,
      tireAndWheel: {
        overallRating: vm.ratings && vm.ratings.tires,
      },
    },
    media: {
      photos: vm.media,
    },
  };
  dm.appraiser = {
    id: vm.owner,
  };
  return dm;
};

export const domainToView = (dm) => {
  const vm = {
    _id: dm._id,
    dateCreated: dm.dateCreated,
    isTradeIn: dm.isTradeIn,
    acv: dm.acv,
    bidRequestsMade: dm.bidRequestsMade || 0,
    recordings: dm.recordings,
    vehicleCategories: dm.vehicleBuildInfo.categories,
    generalInfo: {
      vin: dm.vehicleBuildInfo.vin,
      year: dm.vehicleBuildInfo.year,
      make: dm.vehicleBuildInfo.make,
      model: dm.vehicleBuildInfo.model,
      styleId: dm.vehicleBuildInfo.style,
      source: dm.vehicleBuildInfo.source,
    },
    exteriorColor: dm.vehicleBuildInfo.exteriorColor,
    interiorColor: dm.vehicleBuildInfo.interiorColor,
    options: dm.vehicleBuildInfo.options,
    equipment: dm.vehicleBuildInfo.equipment,
    mileage: dm.vehicleStateInfo.mileage,
    ratings: {
      paint: dm.vehicleStateInfo.condition.paint,
      body: dm.vehicleStateInfo.condition.fitAndFinish,
      interior: dm.vehicleStateInfo.condition.interior,
      tires: dm.vehicleStateInfo.condition.tireAndWheel.overallRating,
    },
    media: resolveLegacyImageResources(dm.vehicleStateInfo.media.photos),
    owner: dm.appraiser.id,
    dealerId: dm.dealer && dm.dealer.dealerId,
  };
  return vm;
};

const appraisalTransformer = { domainToView, viewToDomain };
export default appraisalTransformer;
