var path = require('path');

/**
 * Remote Browser capabilities file for executing against the grid, saucelabs, browserstack and etc..
 * For more information for saucelabs see : https://saucelabs.com/platforms/
 */
var appiumVer = "1.5.3",
    env = require('./environment-config'),
    apps = require('./src/helpers/apps');

module.exports = {
  web: {
    'firefox': {
        browserName: 'firefox',
        platform: 'Windows 7'
    },
    'chrome': {
        browserName: 'chrome',
        platform: 'Windows 7'
    },
    'ie': {
        browserName: 'internet explorer',
        platform: 'Windows 7',
    },
    'safari': {
        browserName: 'safari',
        platform: 'OS X 10.10',
    },   
  },
  ios: {
    '9.2.1': {
      testdroid_username: env.testdroid.username,
      testdroid_password: env.testdroid.password,
      testdroid_target: 'ios',
      testdroid_project: 'Dmx AppraiseIt IOS',
      testdroid_testrun: 'TestRun CreateAppraisal',
      testdroid_device: 'Apple iPhone 5 A1429 9.2.1',
      testdroid_app: 'https://www.dropbox.com/s/mjgxfmty2l13trf/dmx.ipa',
      bundleId: 'io.dmx.appraiseit', 
      platformName: 'iOS',
      platformVersion: '9.2.1',      
      deviceName: 'iOS Device',
      browserName: 'safari',
      newCommandTimeout: 60000
    }, 
    '9.3.2': {
      name: 'DMX iAppraise Mobile - iOS 9.3.2',
      browserName: '',
      platform: '',
      appiumVersion: appiumVer,
      platformName: 'iOS',
      platformVersion: '9.3.2',
      deviceName: 'iPod de ABEL',
      //autoAcceptAlerts: true,    
      udid: 'b0c34081daca64c5e4c2a454fd429c4706ed4baf',
      bundleId: 'io.dmx.appraiseit',
      app: apps.iosDmxApp,
      //deviceOrientation: 'portrait'
    }, 
    '9.3': {
      name: 'DMX iAppraise Mobile - iOS Simulator 9.3',
      browserName: '',
      platform: '',
      appiumVersion: appiumVer,
      platformName: 'iOS',
      platformVersion: '9.3',
      //deviceName: 'iPhone Simulator',
      deviceName: 'iPhone 6',      
      autoLaunch: 'true',
      //autoAcceptAlerts: true,    
      //udid: 'b0c34081daca64c5e4c2a454fd429c4706ed4baf',
      bundleId: 'io.dmx.appraiseit',
      //app: '/Users/fabricioforuria/Desktop/dmx.app',
      app: path.resolve('ios/build/Build/Products/Debug-iphonesimulator/dmx.app'),
      //app: path.resolve('buildAppiumApp/Debug-iphonesimulator/dmx.app'),
      //app: process.cwd() + "/testbuild/test_ios/sample_ios.zip"
      //deviceOrientation: 'portrait'
      newCommandTimeout: 100000,
    }, 
    '8.4': {   
      name: 'DMX iAppraise Mobile - SauceLabs - iPhone 6 Device - iOS 8.4',
      browserName: '',
      platform: '',
      //appiumVersion: appiumVer,      
      appiumVersion: '1.5.3',
      //launchTimeout: 150000,
      //autoAcceptAlerts: true,
      //waitForAppScript: true,      
      platformName: 'iOS',
      platformVersion: '8.4',
      //deviceName: 'iPad 2', 
      deviceName: 'iPhone 6 Device',       
      bundleId: 'io.dmx.appraiseit',
      deviceOrientation: 'portrait',      
      //udid: 'b0c34081daca64c5e4c2a454fd429c4706ed4baf',
      //webStorageEnabled: true,
      //app: 'sauce-storage:dmx.app.zip'
      app: 'sauce-storage:dmx.ipa'
    }, 
  },
  android: {
    '5.0': {
      name: 'DMX iAppraise Mobile - android 5.0',
      browserName: '',
      platform: '',
      appiumVersion: '1.5.3',
      platformName: 'Android',
      //platformVersion: '4.3',
      platformVersion:'5.0',
      //deviceName: 'HSKC36ALGPXA1D1',
      deviceName:'Android Emulator',        
      appActivity: '.MainActivity',
      appPackage: 'com.dmx',          
      //app: apps.androidDmxApp
      webStorageEnabled: true,
      app: 'sauce-storage:app-release.apk'
    }, 
  },
};