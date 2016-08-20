'use strict';

var BasePage = require('./BasePage');
var By = require('selenium-webdriver').By;
var Until = require('selenium-webdriver').until;
var Promise = require('selenium-webdriver').promise;
var assert = require('chai').assert;
var locator = require('./../data/ai-locators');
var dataset = require('./../data/ai-datasets');

function AiCreateAppraiseScreen (webdriver) {
    BasePage.call(this, webdriver);
    locator = locator['appraisal'][platform];  
    dataset = dataset['vin_enter'];  
}

AiCreateAppraiseScreen.prototype = Object.create(BasePage.prototype);
AiCreateAppraiseScreen.prototype.constructor = AiCreateAppraiseScreen;

AiCreateAppraiseScreen.prototype.checkVinValue = function() {
	this.waitForDisplayed(By.xpath(locator.vin));
  	this.driver.findElement(By.xpath(locator.vin)).getText().then(function(text){
    	assert.include(text, dataset.vin, 'Vin value does not match previously entered.');
    });
    return this;
};

AiCreateAppraiseScreen.prototype.enterMileage = function() {
	//this.waitForDisplayed(By.xpath(locator['appraisal']['mileage']));
	this.driver.findElement(By.xpath(locator.mileage)).sendKeys("100000"); 
  	this.driver.findElement(By.xpath(locator.vin)).click();
   	return this;
};

AiCreateAppraiseScreen.prototype.scrollDown = function() {
	//var ele = this.driver.findElement(By.xpath(locator.interior_color));
	//this.driver.executeScript("mobile: scroll", [{direction: "down", element: ele.value}]);
	this.driver.executeScript("mobile: scroll", [{direction: "down"}]);
};

AiCreateAppraiseScreen.prototype.clickRatings = function() {
    //this.driver.executeScript("mobile: scroll", {direction: 'down'}); 
	// this.driver.touchActions().scroll({x: 3, y: 500}).perform();	

    //this.waitForDisplayed(By.xpath(locator['appraisal']['ratings_button'])); 
    this.driver.findElement(By.xpath(locator.ratings_button)).click(); 
   	return this;
};

AiCreateAppraiseScreen.prototype.clickRequestBids = function() {
	this.waitForDisplayed(By.xpath(locator.request_bids));			
	this.driver.findElement(By.xpath(locator.request_bids)).click();
	return this;
};

AiCreateAppraiseScreen.prototype.clickHomeButton = function() {		
	this.driver.findElement(By.xpath(locator.home_button)).click();	
	return this;
};

AiCreateAppraiseScreen.prototype.rateRatings = function() {
	this.waitForDisplayed(By.xpath(locator.paint));		
	this.driver.findElement(By.xpath(locator.paint)).click();
	this.driver.sleep(5000);
	this.waitForDisplayed(By.xpath(locator.tires));	
	this.driver.findElement(By.xpath(locator.tires)).click();
	this.driver.sleep(5000);	
	this.waitForDisplayed(By.xpath(locator.interior));	
	this.driver.findElement(By.xpath(locator.interior)).click();
	this.driver.sleep(5000);	
	this.waitForDisplayed(By.xpath(locator.body));	
	this.driver.findElement(By.xpath(locator.body)).click();
	this.driver.sleep(5000);
	this.waitForDisplayed(By.xpath(locator.ratings_confirm));	
	this.driver.findElement(By.xpath(locator.ratings_confirm)).click();
};

AiCreateAppraiseScreen.prototype.createAppraisal = function() {
	this.checkVinValue(); 
    this.enterMileage(); 
    this.scrollDown();
    this.clickRatings();
    this.rateRatings();  
   	this.clickRequestBids(); 
 	return this;
};

module.exports = AiCreateAppraiseScreen;