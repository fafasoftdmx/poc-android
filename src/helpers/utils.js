'use strict';

exports.writeScreenshot = function(data,name) {
    try{
        var name = name || 'screenshot.png';
        var screenshotPath = './screenshots/';
        require('fs').writeFileSync(screenshotPath + name, data, 'base64');
        //return this; 
    } 
    catch(e){
        throw e;
    }  
};



