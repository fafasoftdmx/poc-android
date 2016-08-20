'use strict';

var webdriver = require('selenium-webdriver');
var environment_config = require('./../../environment-config');
var capabilities_config = require('./../../capabilities-config');
var env_key = process.env.ENV || 'localhost';
var target_key = process.env.TARGET;
var saucelabs =  (env_key === 'saucelabs') ? true : false;
var saucebuild =  process.env.SAUCE_TC_BUILDNUMBER;
var _ = require('lodash');

var env = environment_config[env_key.toLowerCase()]; 

// var child_process = require('child_process');
// var appiumProc    = child_process.spawn('appium', [
//   '--port', env.port, '--address', env.hostname, 
//   '--default-capabilities', '{"fullReset":true}'
// ]);

// var fireAppium = function() {
//   return appiumPromise.then(function () {
//     console.log("DRIVER: will init");
//   });
// };

var build = function() {
    //var env = environment_config[env_key.toLowerCase()]; 
    
    var builder = new webdriver.Builder().usingServer('http://'+ env.hostname + ':' + env.port + '/wd/hub').forBrowser('firefox');

    // Check target_key value
    var target = process.env.TARGET.split(':');
    var target_platform = target[0].toLowerCase();
    var target_device = target[1].toLowerCase();    
    var caps_config = capabilities_config[target_platform][target_device];   
    if ('localhost' === env_key) {
        if ('web' === target_platform) {
            builder.withCapabilities(getLocalBrowserCapabilities(target_device));       
        } else {
            builder.withCapabilities(buildLocalMobileCapabilities(caps_config, env));
        }       
    } else {
        builder.withCapabilities(buildLocalMobileCapabilities(caps_config, env));
        //builder.withCapabilities(buildRemoteBrowserCapabilities(caps_config, env));
    }
    return builder.build();
};

/**
 * Constructs a webdriver instance using the options provided
 * @returns {!webdriver.WebDriver}
 */
// var build = function() {
   
// return appiumPromise.then(function () {
//     console.log("DRIVER: will init");

//     var builder = new webdriver.Builder().usingServer('http://'+ env.hostname + ':' + env.port + '/wd/hub');

//     // Check target_key value
//     var target = process.env.TARGET.split(':');
//     var target_platform = target[0].toLowerCase();
//     var target_device = target[1].toLowerCase();    
//     var caps_config = capabilities_config[target_platform][target_device]; 
    

//     if ('localhost' === env_key) {
//         if ('web' === target_platform) {
//             builder.withCapabilities(getLocalBrowserCapabilities(target_device));       
//         } else {
//             builder.withCapabilities(buildLocalMobileCapabilities(caps_config, env));
//         }       
//     } else {
//         builder.withCapabilities(buildLocalMobileCapabilities(caps_config, env));
//         //builder.withCapabilities(buildRemoteBrowserCapabilities(caps_config, env));
//     }

//     return builder.build();

//     current = {};

//     handler = function(error, el){
//       if (error) {
//         console.log('error', error);
//       }
//       else if(typeof el === 'object'){
//         console.log("Returned in current");
//         current = el;
//       }
//       else {
//         console.log("Returned following string", el);
//       }
//     };

//     quit = function(){
//       driver.quit(function(){
//         process.exit(1);
//       });
//     };
//   }); 


// };

function getPlatform() {
    var target = process.env.TARGET.split(':');
    var target_platform = target[0].toLowerCase();
    return target_platform; 
}

function buildLocalMobileCapabilities (capability, env) {
    switch (env_key)
    {
       case 'localhost':
         return {
          name: capability.name,
          browserName: capability.browserName,
          platform: capability.platform,
          appiumVersion: capability.appiumVersion,
          platformName: capability.platformName,
          platformVersion: capability.platformVersion,
          deviceName: capability.deviceName,
          autoAcceptAlerts: capability.autoAcceptAlerts,  
          udid: capability.udid,
          app: capability.app
        }; 
        //break;
       case 'saucelabs':
        return {
        //   name: capability.name,
        //   browserName: capability.browserName,
        //   platform: capability.platform,
        //   appiumVersion: capability.appiumVersion,
        //   platformName: capability.platformName,
        //   platformVersion: capability.platformVersion,
        //   deviceName: capability.deviceName,
        //   appActivity: capability.appActivity,
        //   appPackage: capability.appPackage,        
        //   app: capability.app,
        //   //autoAcceptAlerts: capability.autoAcceptAlerts,  
        //   app: capability.app,
        //   seleniumVersion : '2.45.0',
        //   username: env.username,
        //   accessKey: env.accessKey,
        //   build: saucebuild
        // }; 

          name: capability.name,
          browserName: capability.browserName,
          platform: capability.platform,
          appiumVersion: capability.appiumVersion,
          platformName: capability.platformName,
          platformVersion: capability.platformVersion,
          deviceName: capability.deviceName,
          //autoAcceptAlerts: capability.autoAcceptAlerts,  
          app: capability.app,
          //webStorageEnabled: capability.webStorageEnabled,
          bundleId: capability.bundleId,
          deviceOrientation: capability.deviceOrientation,
          seleniumVersion : '2.45.0',
          username: env.username,
          accessKey: env.accessKey,
          build: saucebuild
        };
        //break;
       case 'testdroid':
         return {
          testdroid_username: capability.testdroid_username,
          testdroid_password: capability.testdroid_password,
          testdroid_target: capability.testdroid_target,
          testdroid_project: capability.testdroid_project,
          testdroid_testrun: capability.testdroid_testrun,
          testdroid_device: capability.testdroid_device,
          testdroid_app: capability.testdroid_app,
          testdroid_junitWaitTime: capability.testdroid_junitWaitTime,          
          bundleId: capability.bundleId,
          platformName: capability.platformName,
          deviceName: capability.deviceName,
          browserName: capability.browserName,
          newCommandTimeout: capability.newCommandTimeout
        }; 
        //break;
       default: 
         return {
          name: capability.name,
          browserName: capability.browserName,
          platform: capability.platform,
          appiumVersion: capability.appiumVersion,
          platformName: capability.platformName,
          platformVersion: capability.platformVersion,
          deviceName: capability.deviceName,
          autoAcceptAlerts: capability.autoAcceptAlerts,  
          udid: capability.udid,
          app: capability.app
        }; 
    }
}

/**
 * Builds the remote browser capabilities for Saucelabs
 * @param capability
 * @param env
 * @returns {{browserName: *, platform: *, username: (*|null|string|string|string|string), accessKey: (*|string|string|string)}}
 */
function buildRemoteBrowserCapabilities (capability, env) {
    return {
        browserName: capability.browserName,
        platform: capability.platform,
        username: env.username,
        accessKey: env.accessKey,
        name : 'mocha-selenium-pageobject test',
        build: saucebuild,
        seleniumVersion : '2.45.0'
    };
}

/**
 * Gets the local browser capabilities
 * @param browser
 * @returns {*}
 */
function getLocalBrowserCapabilities (browser) {
    switch(browser.toLowerCase()) {
        case 'chrome':
            return webdriver.Capabilities.chrome();
        case 'safari':
            return webdriver.Capabilities.safari();
        case 'firefox':
            return webdriver.Capabilities.firefox();
        case 'ie':
            return webdriver.Capabilities.ie();
        default:
            return webdriver.Capabilities.chrome();
    }
}



// APPIUM RELATED STUFF START ---------------------------------------------------------

// var loadedAppium = null;

// var appiumPromise = new Promise(function (resolve, reject) {
//   appiumProc.stdout.on('data', function (data) {
//     if (loadedAppium) return;
//     console.log('APPIUM: ' + data);

//     if (data.indexOf('Appium REST http interface listener started') >= 0) {
//       loadedAppium = true;
//       resolve(data);
//     }
//   });

//   appiumProc.stderr.on('data', function (data) {
//     console.log('APPIUM err: ' + data);
//     appiumProc.kill();
//   });
//   process.on('exit', function () {
//     appiumProc.kill();
//   });

// });


// APPIUM RELATED STUFF END ---------------------------------------------------------

module.exports.build = build;
//module.exports.fireAppium = fireAppium;
module.exports.saucelabs = saucelabs;
