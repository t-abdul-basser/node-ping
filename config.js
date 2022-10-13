"use strict"

const envVars = require('./.env');


module.exports = {
  deliveryEmail: envVars.deliveryEmail,
  mailer: {
    host: envVars.smtpHost,
    port: envVars.smtpPort,
    email: envVars.email,
    user: envVars.smtpUser,
    password: envVars.smtpPwd
  }
};
