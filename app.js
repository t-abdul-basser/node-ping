"use strict";

const Ping = require('ping-monitor');
const http = require('http');
const websites = require('./websites');
const logger = require('./logger');
const router = require('./router');
const monitors = [];
const port = process.env.PORT || 3008;
const urls = [];


function pingServers() {

  // Iterate through websites and create a ping monitor for each website
  websites.forEach(function (website) {

    let monitor = new Ping ({
      website: website.url,
      interval: website.interval
    });


    monitor.on('up', function (res) {
        //TODO: remove console.log      
        console.log('Yay!! ' + res.website + ' is up.');
        logger.log('Yay!! ' + res.website + ' is up.');
    });


    monitor.on('down', function (res) {
      logger.log(res.website + ' is down -' + 'Time: ' + monitor.getFormatedDate(res.time) + 'Website: ' + res.website + ' Message: ' + res.statusMessage);
    });


    monitor.on('error', function (res) {
        logger.log(res.website + ' is down -' + 'Time: ' + monitor.getFormatedDate(res.time) + 'Website: ' + res.website + ' Message: ' + res.statusMessage)
    });


    monitor.on('stop', function (website) {
        console.log(website + ' monitor has stopped.');
        logger.log(website + ' monitor has stopped.')
    });


    urls.push(website.url);
    monitors.push(monitor);
  });
}


// start monitoring servers
pingServers();


// create web server
const server = http.createServer(router(urls));

server.listen(port);
console.log('Listening to port %s', port);
