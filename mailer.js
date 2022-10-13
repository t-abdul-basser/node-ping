"use strict";

const nodemailer = require('nodemailer');
const config = require('./config');
const subject = 'Website Down';
//TODO include Ping Monitor URL
const emailFooter = '<br><br><br><a href="">Ping Monitor</a>';

module.exports.sendEmail = function(opts, fn) {

    let transporter = nodemailer.createTransport({
        host: config.mailer.host,
        port: config.mailer.port,
        auth: {
            user: config.mailer.user,
            pass: config.mailer.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let data = {
        from: config.mailer.email,
        to: config.deliveryEmail,
        subject: opts.subject || subject,
        html: opts.body + emailFooter
    }

    transporter.sendMail(data, fn);
};
