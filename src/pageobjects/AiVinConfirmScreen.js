'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var assert = require('chai').assert;
var locator = require('./../data/ai-locators');
var dataset = require('./../data/ai-datasets');
var Promise = require('selenium-webdriver').promise;

function AiVinConfirmScreen (webdriver) {
    BasePage.call(this, webdriver);
    locator = locator['vin_confirm'][platform];  
    dataset = dataset['vin_confirm'];     
}

AiVinConfirmScreen.prototype = Object.create(BasePage.prototype);
AiVinConfirmScreen.prototype.constructor = AiVinConfirmScreen;

AiVinConfirmScreen.prototype.checkDecodedVinMessage = function() {
    this.waitForDisplayed(By.xpath(locator.decoded_message));
    // this.driver.findElement(By.xpath(locator['vin_confirm']['decoded_message'])).getText().then(function(text){
    //     assert.include(text, 'LOGOUT', 'VIN Code was not properly decoded.');
    //   }); 
    // this.driver.findElement(By.xpath(locator['vin_confirm']['decoded_message'])).getText().then(function(text){
    //     assert.include(text, '2013 Chevrolet', 'VIN Code was not properly decoded.');
    //   });     

    // this.driver.wait(Until.elementTextContains(By.xpath(locator['vin_confirm']['decoded_message']),'Chevrolet')).then(function(text) {
    //     console.log(text + ' text was found.' );
    // });

    return this;
};

AiVinConfirmScreen.prototype.confirmDecodedVinCode = function() {
    this.waitForDisplayed(By.xpath(locator.decoded_message));        
	this.driver.findElement(By.xpath(locator.confirm)).click();
    return this;
};

module.exports = AiVinConfirmScreen;