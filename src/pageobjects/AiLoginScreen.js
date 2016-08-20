'use strict';

var BasePage = require('./BasePage');
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var Keys = require('selenium-webdriver').Keys;
var Until = require('selenium-webdriver').until;
var locator = require('./../data/ai-locators');
var dataset = require('./../data/ai-datasets');
var Utils = require('./../helpers/utils');

function AiLoginScreen (webdriver) {
    // try{
	    BasePage.call(this, webdriver);
	    locator = locator['login'][platform];  
	    dataset = dataset['login']; 
    // } 
    // catch(e){
    //     throw e;
    // }    
}

AiLoginScreen.prototype = Object.create(BasePage.prototype);
AiLoginScreen.prototype.constructor = AiLoginScreen;

AiLoginScreen.prototype.isLoaded = function() {
    //try{
        this.driver.sleep(20000);
		this.waitForDisplayed(By.xpath(locator.pass));
	    return this;
    // } 
    // catch(e){
    //     throw e;
    // } 
};

AiLoginScreen.prototype.acceptIfPopup = function() {	
    // try{
        this.driver.sleep(10000);
		this.waitForDisplayed(By.xpath(locator.popup));
		this.driver.findElement(By.xpath(locator.popup)).click();	
		return this;
    // } 
    // catch(e){
    //     throw e;
    // } 
};

AiLoginScreen.prototype.enterUsername = function() {	
    // try{
		this.driver.findElement(By.xpath(locator.user)).sendKeys(dataset.user);	
		return this;
    // } 
    // catch(e){
    //     throw e;
    // } 	
};

AiLoginScreen.prototype.enterPasswordthenGo = function() {
    // try{	 
		var elem = this.driver.findElement(By.xpath(locator.pass)).sendKeys(dataset.pass+"\n");
		return this;
    // } 
    // catch(e){
    //     throw e;
    // } 
};

AiLoginScreen.prototype.getUsername = function() {
    // try{
	    var username = this.driver.findElement(By.xpath(locator.user));
	    return username.getText();
    // } 
    // catch(e){
    //     throw e;
    // } 
};

AiLoginScreen.prototype.login = function() {
    // try{
		this.acceptIfPopup(); 	    
		this.isLoaded();	
		this.enterUsername(); 		
		this.enterPasswordthenGo();	
		return this;	
    // } 
    // catch(e){
    //     throw e;
    // } 
};

module.exports = AiLoginScreen;