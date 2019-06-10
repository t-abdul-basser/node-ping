"use strict";

const Ping = require('ping-monitor');
const http = require('http');
const websites = require('./websites');
const mailer = require('./mailer');
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
        console.log('Yay!! ' + res.website + ' is up.');
    });


    monitor.on('down', function (res) {
        mailer.sendEmail({
          subject: res.website + ' is down',
          body: '<p>Time: ' + monitor.getFormatedDate(res.time) + '</p><p>Website: ' + res.website + ' </p><p>Message: ' + res.statusMessage + ' </p>'
        },
        function (err, message) {
          if (err) {
            console.error(err.message);
          }
          else {
            console.log(res.website + ' is down. Email sent!');
          }
        });
    });


    monitor.on('error', function (res) {
        mailer.sendEmail({
          subject: res.website + ' is down',
          body: '<p>Time: ' + monitor.getFormatedDate(res.time) + '</p><p>Website: ' + res.website + ' </p><p>Message: ' + res.statusMessage + ' </p>'
        },
        function (err, message) {
          if (err) {
            console.error(err.message);
          }
          else {
            console.log(res.website + ' is down. Email sent!');
          }
        });
    });


    monitor.on('stop', function (website) {
        console.log(website + ' monitor has stopped.');
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
