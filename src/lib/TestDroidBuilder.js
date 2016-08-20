'use strict';

var TestDroid = require('testdroid');
var environment_config = require('./../../environment-config');

/**
  * Builds the testdroid configuration
  * @returns {*|exports|module.exports}
 */
var build = function() {
    return new TestDroid({
        username: environment_config.testdroid.username,
        password: environment_config.testdroid.accessKey
    });
};

module.exports.build = build;
