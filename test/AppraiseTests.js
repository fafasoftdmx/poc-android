'use strict';

var test = require('selenium-webdriver/testing');
var assert = require('chai').assert;
var DriverBuilder = require('./../src/lib/DriverBuilder');

//var SauceLabsBuilder = require('./../src/lib/SauceLabsBuilder');
var AiLoginScreen = require('./../src/pageobjects/AiLoginScreen');
var AiHomeScreen = require('./../src/pageobjects/AiHomeScreen');
var AiEnterVinCodeScreen = require('./../src/pageobjects/AiEnterVinCodeScreen');
var AiVinConfirmScreen = require('./../src/pageobjects/AiVinConfirmScreen');
var AiVinConfirmScreen = require('./../src/pageobjects/AiVinConfirmScreen');
var AiCreateAppraiseScreen = require('./../src/pageobjects/AiCreateAppraiseScreen');
var AiSuccessAppraisalScreen = require('./../src/pageobjects/AiSuccessAppraisalScreen');
var Utils = require('./../src/helpers/utils');

var fs = require('fs');
var path = require('path');
var request = require('request');
global.sessionId = '';


/**
 * iAppraise Login Test Suite
 */
test.describe('Ai', function() {
    this.timeout(35000);

    var driver;
    //var sessionId;

    test.before(function() {
        var target = process.env.TARGET.split(':');
        global.platform = target[0].toLowerCase();
    });

    test.beforeEach(function() {


        // return DriverBuilder.fireAppium().then(function(response) {
        //   console.log("Success!", response);
        //   driver = DriverBuilder.build();
        // }, function(error) {
        //   console.error("Failed!", error);
        // });


        driver = DriverBuilder.build();
        
        // driver.getSession().then(function (sessionid){
        //     sessionId = sessionid.id_;
        // });
    });

    test.it('create', function() {
        //try{
            var aiLoginScreen = new AiLoginScreen(driver);
            aiLoginScreen.login();     
            var aiHomeScreen = new AiHomeScreen(driver);
            aiHomeScreen.clickOnAppraise();  
            // var aiEnterVinCodeScreen = new AiEnterVinCodeScreen(driver);
            // aiEnterVinCodeScreen.enterVinCodeAndDecodeIt();
            // var aiVinConfirmScreen = new AiVinConfirmScreen(driver);



            //aiVinConfirmScreen.checkDecodedVinMessage();


            // aiVinConfirmScreen.confirmDecodedVinCode();
            // var aiCreateAppraiseScreen = new AiCreateAppraiseScreen(driver);
            // aiCreateAppraiseScreen.createAppraisal();
            // var aiSuccessAppraisalScreen = new AiSuccessAppraisalScreen(driver);  
            // aiSuccessAppraisalScreen.checkSuccess();  
            // aiHomeScreen = new AiHomeScreen(driver);
            // aiHomeScreen.checkCreatedAppraisal();

            
            //done();
        // } 
        // catch(e){
        //     throw e;
        //     done();
        // } 
    });

    /**
     * Clean up function after each test ends
     */
    test.afterEach(function() {
        var currentTest = this.currentTest;
        var passed = (currentTest.state === 'passed') ? true : false;
        if (!passed) {
            driver.takeScreenshot().then(function(data) {
                var myDate = new Date();
                var DateTimeString = (myDate.getMonth() + 1) + "-" + myDate.getDate() + "-" + myDate.getFullYear() + '_' + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
                Utils.writeScreenshot(data, platform +'-'+ currentTest.fullTitle() +'-'+ DateTimeString + '.png')
            });  

        // fs.readFileSync(path.resolve('./../reports/testRun.xml'), 'ascii').then(function(testResults){
        //     console.log('session ID: ' + sessionId); 
        //     console.log('test results: ' + testResults); 
        //     request({
        //         url: "http://appium.testdroid.com/upload/result?sessionId=" + sessionId,
        //         method: "POST",
        //             form:{result: "result" },
        //         headers: {
        //             "content-type": "application/xml",  // <--Very important!!!
        //         },
        //         body: testResults
        //     }, function (error, response, body){
        //         console.log(response);
        //         //done();
        //     });             
        // });


        }
        //driver.quit();

        driver.quit().then (function (){
            if (DriverBuilder.saucelabs) {
                console.log('LOG : Updating Sauce');              
                var saucelabs = SauceLabsBuilder.build();
                saucelabs.updateJob(sessionId, { name: currentTest.title, passed: passed }, done);
                console.log('LOG : Finished with Sauce');
            } else {
                //done();
            }
        });

        // driver.quit().then (function (done){
        // var data;
        // try {
        //   data = fs.readFileSync('foo.bar');
        // } catch (e) {
        //   // Here you get the error when the file was not found,
        //   // but you also get any other error
        // }


        // fs.readFileSync(path.resolve('./../reports/testRun.xml'), 'ascii').then(function(testResults){
        //     console.log('test results:' + testResults); 
        //     request({
        //         url: "http://appium.testdroid.com/upload/result?sessionId=" + sessionId,
        //         method: "POST",
        //             form:{result: "result" },
        //         headers: {
        //             "content-type": "application/xml",  // <--Very important!!!
        //         },
        //         body: testResults
        //     }, function (error, response, body){
        //         console.log(response);
        //         //done();
        //     });             
        // });

        


        //     if (DriverBuilder.saucelabs) {
        //         console.log('LOG : Updating Sauce');              
        //         var saucelabs = SauceLabsBuilder.build();
        //         saucelabs.updateJob(sessionId, { name: currentTest.title, passed: passed }, done);
        //         console.log('LOG : Finished with Sauce');
        //     } else {
        //         done();
        //     }
        // });


    });



});

// test.after(function() {
//     fs.readFileSync(path.resolve('./../reports/testRun.xml'), 'ascii').then(function(testResults){
//         console.log('test results:' + testResults); 
//         request({
//             url: "http://appium.testdroid.com/upload/result?sessionId=" + sessionId,
//             method: "POST",
//                 form:{result: "result" },
//             headers: {
//                 "content-type": "application/xml",  // <--Very important!!!
//             },
//             body: testResults
//         }, function (error, response, body){
//             console.log(response);
//             //done();
//         });             
//     });
// });



