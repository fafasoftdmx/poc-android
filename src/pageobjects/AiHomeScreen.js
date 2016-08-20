'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var assert = require('chai').assert;
var locator = require('./../data/ai-locators');
var dataset = require('./../data/ai-datasets');

function AiHomeScreen (webdriver) {
    BasePage.call(this, webdriver);
    locator = locator['home'][platform];  
    dataset = dataset['home'];      
}

AiHomeScreen.prototype = Object.create(BasePage.prototype);
AiHomeScreen.prototype.constructor = AiHomeScreen;

AiHomeScreen.prototype.isLoaded = function() {
    // try{
		this.driver.sleep(10000);
	    this.waitForDisplayed(By.xpath(locator.new));
	    return this;
    // } 
    // catch(e){
    //     throw e;
    // } 
};

AiHomeScreen.prototype.clickOnAppraise = function() {
    // try{
		this.waitForDisplayed(By.xpath(locator.new));
		this.driver.findElement(By.xpath(locator.new)).click();
		return this;
    // } 
    // catch(e){
    //     throw e;
    // } 
};

AiHomeScreen.prototype.checkCreatedAppraisal = function() {
    // try{
		this.isLoaded();
		this.findTextOnList(By.xpath(dataset.rows),dataset.vehicle);
		return this;
    // } 
    // catch(e){
    //     throw e;
    // }
};

module.exports = AiHomeScreen;