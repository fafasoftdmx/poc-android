'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var assert = require('chai').assert;
var locator = require('./../data/ai-locators');
var dataset = require('./../data/ai-datasets');

function AiEnterVinCodeScreen (webdriver) {
    BasePage.call(this, webdriver);
    locator = locator['vin_enter'][platform];  
    dataset = dataset['vin_enter'];      
}

AiEnterVinCodeScreen.prototype = Object.create(BasePage.prototype);
AiEnterVinCodeScreen.prototype.constructor = AiEnterVinCodeScreen;

AiEnterVinCodeScreen.prototype.acceptIfPopup = function() {	
	var errorMessage = '';
	this.waitForDisplayed(By.xpath(locator.camera_popup_ok), 2000).then(function() {
		this.driver.findElement(By.xpath(locator.camera_popup_ok)).click();	
	  }, function() {
	    errorMessage = 'Allow camera message did not pop up.';
	  });
	return errorMessage;
};

AiEnterVinCodeScreen.prototype.checkVimScanAlignMessage = function() {
	var next = function(results) {}; 
	if (platform == 'ios') { 
	  	this.waitForDisplayed(By.xpath(locator.align_redline_label));
	  	this.driver.findElement(By.xpath(locator.align_redline_label)).getText().then(function(text){
	    	assert.include(text, dataset.align_redline, 'VIN Code Scan screen is displayed.');
	    });	  
	} else { 
	  	this.waitForDisplayed(By.id(locator.align_redline_label));
	  	this.driver.findElement(By.id(locator.align_redline_label)).getText().then(function(text){
	    	assert.include(text, dataset.align_redline, 'VIN Code Scan screen is displayed.');
	    });	 
	} 
    return this;
};

AiEnterVinCodeScreen.prototype.enterVinCode = function() {
	this.waitForDisplayed(By.xpath(locator.enter_vin_text));
	var elem = this.driver.findElement(By.xpath(locator.enter_vin_text));
	elem.clear();
	elem.sendKeys(dataset.vin +"\n");
	return this;	
};

AiEnterVinCodeScreen.prototype.enterVinCodeAndDecodeIt = function() {
	// this.waitForDisplayed(By.xpath(locator['vin_enter']['enter_vin_button']));
	// this.driver.sleep(3000);
	//this.acceptIfPopup(); 	    
	this.checkVimScanAlignMessage();
	var next = (platform == 'ios') ? this.driver.findElement(By.xpath(locator.enter_vin_button)).click() : this.driver.findElement(By.id(locator.enter_vin_button)).click();	
	this.enterVinCode();
	//this.waitForDisplayed(By.xpath(locator.decode_vin_button));		
	this.driver.findElement(By.xpath(locator.decode_vin_button)).click();		
	return this;	
};

module.exports = AiEnterVinCodeScreen;