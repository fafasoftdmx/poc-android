'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var Promise = require('selenium-webdriver').promise;
var assert = require('chai').assert;
var locator = require('./../data/ai-locators');
var dataset = require('./../data/ai-datasets');

function AiSuccessAppraisalScreen (webdriver) {
    BasePage.call(this, webdriver);
    locator = locator['success'][platform];     
}

AiSuccessAppraisalScreen.prototype = Object.create(BasePage.prototype);
AiSuccessAppraisalScreen.prototype.constructor = AiSuccessAppraisalScreen;

AiSuccessAppraisalScreen.prototype.checkSuccessfulRequestMessage = function() {
	this.waitForDisplayed(By.xpath(locator.success_request_bids));
  	this.driver.findElement(By.xpath(locator.success_request_bids)).getText().then(function(text){
    	assert.include(text, 'You successfully requested bids for', 'Successful bids request message is not displayed.');
    });
    return this;
};

AiSuccessAppraisalScreen.prototype.clickHomeButton = function() {		
	this.driver.findElement(By.xpath(locator.home_button)).click();	
	return this;
};

AiSuccessAppraisalScreen.prototype.checkSuccess = function() {
    this.checkSuccessfulRequestMessage(); 
    this.clickHomeButton();  
 	return this;
};

module.exports = AiSuccessAppraisalScreen;