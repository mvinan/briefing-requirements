'use strict'

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.get('/', function(req, res, next){
})

router.post('/', function(req, res, next){

  var data = {
    from: req.body.name + '<'+req.body.email+'>',
    to: process.env.REQUIREMENTS_MAIL || 'hola@miguelvinan.com',
    subject: 'Proyecto Web: ' + req.body.projectName,
    html: '<p>Prioridad Sitio Web : <b>' + req.body.q4 + '</b></p>'+
    '<p>Target o audencia objetiva : <b>' + req.body.q5 + '</b></p>'+
    '<p>Servicios de la empresa : <b>' + req.body.q6 + '</b></p>'+
    '<p>Deseado en el diseño : </p><p><b>' + req.body.q7 + '</b></p>'+
    '<p>Evitar en el diseño : </p><p><b>' + req.body.q8 + '</b></p>'+
    '<p>Paginas de referencia : </p><p><b>' + req.body.q9 + '</b></p>'+
    '<p>Color de preferencia : <b>' + req.body.colorList + '</p>'
  };

  mailgun.messages().send(data, function (error, body) {
    if(!error){
      res.redirect('/')
    } else {
      res.render('error' , {message: 'Algo esta roto. No te preocupes, intentemoslo mas tarde por favor !'})
      console.log(error);
    }
  });


})

module.exports = router;
