<<<<<<< HEAD

/*
   Module for sending emails
*/

var nodemailer = require('nodemailer');


/*
    Mailer function

    @param - (Object) opts - mailing options
    @param - (Function) fn - callback function
*/
var mailer = function (opts, fn) {

    // Send maail
    try {
      var transporter = nodemailer.createTransport();

      transporter.sendMail({
        from: opts.from,
        to: opts.to,
        subject: opts.subject,
        html: opts.body
      });
    }
    catch (err) {
        fn('Nodemailer could not send Mail', '');
    }
};

module.exports = mailer;
=======
"use strict";


const Mailgun = require('mailgun-js');
const config = require('./config');
const subject = 'Website Down';
const emailFooter = '<br><br><br><a href="http://node-ping.herokuapp.com">Ping Monitor</a>';


module.exports.sendEmail = function(opts, fn) {

  let mailgun = new Mailgun({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain
  });

  let data = {
    from: config.mailgun.email,
    to: config.deliveryEmail,
    subject: opts.subject || subject,
    html: opts.body + emailFooter
  };

  mailgun.messages().send(data, fn);
};
>>>>>>> 55d987a945067f0bc218430b496fe498889f005e
