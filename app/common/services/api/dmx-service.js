import dmxAppStateService from './../state/stateService';
import appraisalTransformer from '../models/appraisal-transformer';
import promisify from 'es6-promisify';
import RNFS from 'react-native-fs';
import { DeviceEventEmitter, NativeModules } from 'react-native';

export const DMXENDPOINTS = {
  authentication: 'https://authentication.dmx.io/',
  user: 'https://authentication.dmx.io/user/',
  appraisal: 'https://api.dmx.io/appraisals/',
  myAppraisals: 'https://api.dmx.io/appraisals/appraiser/',
  myDealershipAppraisals: 'https://api.dmx.io/appraisals/dealer/',
  vehicle: 'https://api.dmx.io/vehicle-info/vehicle/',
  media: 'https://api.dmx.io/media/', // will deprecate
  images: 'https://api.dmx.io/media/images/',
  audio: 'https://api.dmx.io/media/audio',
  decodeVin: 'https://api.dmx.io/vehicle-info/vin/',
  placeBid: 'https://api.dmx.io/market/place-bid',
  requestBids: 'https://api.dmx.io/market/request-bids',
  registerDevice: 'https://api.dmx.io/notifications/register',
  marketValue: (styleId, condition, mileage, zip, optionIdList, colorIdList) => `https://api.dmx.io/vehicle-info/vehicle/${styleId}/true-market-value?condition=${condition}&mileage=${mileage}&zip=${zip}&optionid=${optionIdList.join('&optionid=')}&colorid=${colorIdList.join('&colorid=')}`,
};
const authToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
  'eyJ0bXAiOiJ0bXAiLCJpYXQiOjE0NTg5Mzg0Njh9.-Zxn3iUOgStVOK5_yHUbw5-2bdLqRJ_eoDBORSrTIHQ';
const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: authToken,
};
const JUST_AUTHORIZATION_HEADER = {
  Authorization: authToken,
};

const SERVICE_KEYS = {
  userAuthToken: 'dmxAuthToken',
  userProfile: 'userProfile',
};

const performActivity = activity => {
  DeviceEventEmitter.emit('valuechange-showactivity', true);
  return activity
        .then((res) => {
          DeviceEventEmitter.emit('valuechange-showactivity', false);
          return res;
        })
        .catch((error) => {
          DeviceEventEmitter.emit('valuechange-showactivity', false);
          throw error;
        });
};

const assertStatuses = (...statuses) =>
    res => {
      if (statuses.find(s => res.status === s || res.status === s.toString())) {
        return res;
      }
      throw new Error(`unexpected status: ${res.status}`);
    };

const uploadFile = (...args) => promisify(NativeModules.FileUpload.upload)(...args)
    .then(assertStatuses(200));

function handleFailedRequest(res) {
  console.log(`HTTP ${res.status} ${res.statusText}`);
  console.log(res.headers);
}

const api = {
  ServiceKeys: SERVICE_KEYS,
  registerDevice(deviceId, tokenId) {
    console.log(`<<< register device >>> deviceId: ${deviceId}, tokenId: ${tokenId}`);
    const fetchParams = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ device: deviceId, token: tokenId }),
    };
    const url = DMXENDPOINTS.registerDevice;
    return fetch(url, fetchParams)
      .then((res) => res.json())
      .catch((ex) => console.log('\n\n<<<<< ERROR RESPONSE >>>>>\n\n', ex));
  },
  registerUser(query) {
    const formattedQuery = query || {
      firstname: 'Bilbo',
      lastname: 'Bagginses',
      email: 'baggins1@dmx.io',
      password: 'testpassword',
    };
    const fetchParams = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(formattedQuery),
    };
    const url = `${DMXENDPOINTS.authentication}register`;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
      .then((res) => {
        DeviceEventEmitter.emit('valuechange-showactivity', false);
        if (res.ok) {
          console.log('User Registration was successful with email: ', formattedQuery.email);
        } else {
          throw new Error('User Registration was unsuccessful');
        }
      })
      .catch((error) => {
        console.warn('User Registration was unsuccessful', error);
        DeviceEventEmitter.emit('valuechange-showactivity', false);
      });
  },
  login(query) {
    const formattedQuery = query || {
      email: 'baggins1@dmx.io',
      password: 'testpassword',
    };
    const fetchParams = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(formattedQuery),
    };
    const url = `${DMXENDPOINTS.authentication}login`;

    console.log('login url: ', url);
    console.log('login body: ', formattedQuery);
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
      .then(res => {
        DeviceEventEmitter.emit('valuechange-showactivity', false);
        if (res.ok) {
          console.log('Login was successful with email: ', formattedQuery.email);
          return res.json().then((json) => {
            console.log('response json ::: ', json);
            if (json.token) {
              dmxAppStateService.setItem(SERVICE_KEYS.userAuthToken, json.token);
              dmxAppStateService.setItem(SERVICE_KEYS.userProfile, JSON.stringify(json.user));
              console.log('Saved authorization token', json.token);
              return { status: 'success', user: json.user };
            }
            throw new Error('Authorization token not found');
          });
        }
        throw new Error('Login was unsuccessful');
      });
  },
  logout() {
    dmxAppStateService.multiRemoveItems([SERVICE_KEYS.userAuthToken, SERVICE_KEYS.userProfile]);
    console.log('Logged out user');
  },
  isLoggedIn() {
    const token = dmxAppStateService.getItem(SERVICE_KEYS.userAuthToken);
    return token !== false;
  },
  getUserProfileByToken(token) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = DMXENDPOINTS.user + token;
    return fetch(url, fetchParams).then((res) => res.json());
  },
  vinDecode(vin) {
        // check stateservice for vin
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = DMXENDPOINTS.decodeVin + vin;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
            .then(async (res) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              if (res.ok) {
                return res.json();
              }
              throw new Error(`error while calling ${url}: ${JSON.stringify(await res.text())}`);
            })
            .catch((error) => {
              console.error(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
            });
  },
  getVehicleInfo(styleId) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = DMXENDPOINTS.vehicle + styleId;
    return fetch(url, fetchParams)
            .then((res) => res.json())
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
            });
  },
  saveAppraisal(appraisal) {
    const dmAppraisal = appraisalTransformer.viewToDomain(appraisal);
    const fetchParams = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(dmAppraisal),
    };
    const url = DMXENDPOINTS.appraisal;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
            .then((res) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              if (res.ok) {
                return res.json();
              }
              handleFailedRequest(res);
              throw new Error(`request to ${url} failed`);
            })
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              throw error;
            });
  },
  deleteAppraisal(id) {
    const fetchParams = {
      method: 'DELETE',
      headers: HEADERS,
    };
    const url = `${DMXENDPOINTS.appraisal}${id}`;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
            .then((res) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              if (res.ok) {
                return res.json();
              }
              handleFailedRequest(res);
              return appraisalTransformer.domainToView(res.json());
            })
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              throw error;
            });
  },
  updateAppraisal(appraisal) {
    const dmAppraisal = appraisalTransformer.viewToDomain(appraisal);
    const fetchParams = {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(dmAppraisal),
    };
    const url = DMXENDPOINTS.appraisal;
    return fetch(url, fetchParams)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              handleFailedRequest(res);
              throw new Error(`request to ${url} failed`);
            })
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
            });
  },
  getAppraisal(id) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = DMXENDPOINTS.appraisal + id;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
            .then((res) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              if (res.ok) {
                return appraisalTransformer.domainToView(res.json());
              }
              throw new Error(`request to ${url} failed`);
            })
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
            });
  },
  getMyAppraisals(owner, limit, skip) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = `${DMXENDPOINTS.myAppraisals}${owner}?limit=${limit}&skip=${skip}`;
    console.log('getting my appraisals', url);
    return fetch(url, fetchParams)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              throw new Error(`request to ${url} failed`);
            })
            .catch((error) => {
              console.log(error);
            });
  },
  getMyDealershipAppraisals(owner, dealerId, limit, skip) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = `${DMXENDPOINTS.myDealershipAppraisals}${dealerId}?limit=${limit}&skip=${skip}`;
    console.log('getting my dealership appraisals', url);
    return fetch(url, fetchParams)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              throw new Error(`request to ${url} failed`);
            })
            .catch((error) => {
              console.log(error);
            });
  },
  getAppraisals(limit, skip = 0) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = `${DMXENDPOINTS.appraisal}?limit=${limit}&skip=${skip}`;
    return fetch(url, fetchParams)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              handleFailedRequest(res);
              throw new Error(`request to ${url} failed`);
            })
            .catch((error) => {
              console.log(error);
            });
  },
  placeBid(appraisal) {
    const fetchParams = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(appraisal),
    };
    const url = DMXENDPOINTS.placeBid;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
            .then((res) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              return res.json();
            })
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
            });
  },
  requestBids(appraisalId, ownerId) {
    const payload = { appraisal: appraisalId, user: ownerId };
    console.log(`>>>> payload: appraisalId - ${appraisalId} :: ownerId - ${ownerId}`);
    console.log('payload is', JSON.stringify(payload));
    const fetchParams = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(payload),
    };
    const url = DMXENDPOINTS.requestBids;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
            .then((res) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              return res.json();
            })
            .catch((error) => {
              console.log(error);
              DeviceEventEmitter.emit('valuechange-showactivity', false);
            });
  },
  saveMedia(uri, fileName) {
    console.log('uri in web service call', uri);
    console.log('angle in web service call', fileName);
    const obj = {
      uploadUrl: DMXENDPOINTS.media,
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: JUST_AUTHORIZATION_HEADER,
      files: [
        {
          name: fileName, // optional, if none then `filename` is used instead
          filename: fileName, // require, file name
          filepath: uri, // require, file absoluete path
          filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
        },
      ],
      // NB: for current (21.06.2016) implementation, this field is required for Android.
      fields: {},
    };
    try {
      DeviceEventEmitter.emit('valuechange-showactivity', true);
      console.log('attempting to upload photo with data', obj);
      return new Promise((resolve, reject) => {
        NativeModules.FileUpload.upload(obj, (err, res) => {
          DeviceEventEmitter.emit('valuechange-showactivity', false);
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    } catch (err) {
      DeviceEventEmitter.emit('valuechange-showactivity', false);
      throw new Error('Image save network request failed with error ', err);
    }
  },
  getAudio(fromUrl) {
    const destinationDirectory = RNFS.DocumentDirectoryPath;
    const toFile = `${destinationDirectory}/${fromUrl.split('/').pop()}.mp4`;

    return performActivity(RNFS.downloadFile({
      fromUrl,
      toFile,
      headers: HEADERS,
    })).then(() => {
      console.log('file downloaded!');
      return toFile;
    })
            .catch((error) => {
              console.log(error);
              throw error;
            });
  },
  saveAudio(uri, fileName) {
    console.log('uri in web service call', uri);
    console.log('fileName in web service call', fileName);
    const obj = {
      uploadUrl: DMXENDPOINTS.audio,
      method: 'POST',
      headers: JUST_AUTHORIZATION_HEADER,
      files: [
        {
          name: fileName,
          filename: fileName,
          filepath: uri,
          filetype: 'audio/mp4',
        },
      ],
      // NB: for current (21.06.2016) implementation, this field is required for Android.
      fields: {},
    };
    console.log('attempting to upload audio with data', obj);
    return performActivity(uploadFile(obj).then(res => JSON.parse(res.data)));
  },
  getMarketValue(styleId, condition = 'Clean', mileage, zip = '77019', optionIdList, colorIdList) {
    const fetchParams = {
      method: 'GET',
      headers: HEADERS,
    };
    const url = DMXENDPOINTS.marketValue(
      styleId,
      condition,
      mileage,
      zip,
      optionIdList || [],
      colorIdList || []
    );
    return fetch(url, fetchParams)
            .then((res) => res.json())
            .catch((ex) => {
              DeviceEventEmitter.emit('valuechange-showactivity', false);
              console.log('getting mkt value, fetch params: ', fetchParams);
              console.log('getting mkt value, url is', url);
              console.log('\n\n<<<<< MARKET VALUE :: ERROR RESPONSE >>>>>\n\n', ex);
            });
  },
};

export default api;
