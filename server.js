(function(){
  'use strict';

  var express    = require('express'),
      path       = require('path'),
      app        = express(),
      bodyParser = require('body-parser');

  var routes = require('./routes/index');
  var mail = require('./routes/mail');

  var port = process.env.PORT || 3000;

  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', routes);
  app.use('/mail', mail);

  app.use(function(req, res, next) {
    var err = new Error('Creo que estas buscando en otra direccion.');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  app.listen(port, function () {
    console.log('Escuchando en el puerto %s', port);
  });

})();
