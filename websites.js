"use strict";


/*
 * List of websites to be monitored
 * url -  website to be monitored
 * interval - polling interval in minutes
**/
module.exports = [
    {
        url: 'https://discovery.dbmi.columbia.edu/atlas/',
        interval: 15
    },
    {
        url: 'https://achilles.sis.nyp.org/#/home',
        interval: 15
    },
    {
        url: 'http://node-ping.herokuapp.com',
        interval: 15
    }
];
