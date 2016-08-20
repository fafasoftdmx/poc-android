var sauce_user = process.env.SAUCE_USER || 'Saucelabs user NOT set';
var sauce_key = process.env.SAUCE_KEY || 'Saucelabs key NOT set';

/**
 * Builds the execution environment configuration used in Driver Builder
 */
module.exports = {
    localhost : {
        hostname: '127.0.0.1',
        port: '4725'        
    },
    testdroid : {
        username: 'fabricio.foruria@dmx.io',
        password: 'doustro',
        hostname: 'appium.testdroid.com',
        port: '80'
    },   
    saucelabs : {
        username : 'fafasoft',
        accessKey : '19a0c6b8-5f96-428e-837f-3e0f871eb257',
        hostname: 'ondemand.saucelabs.com',
        port: '80'
    },
    // TODO still needs a bit more customization for this to fully work with browserstack
    browserstack : {

    }
};