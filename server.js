(function(){
  'use strict';

  var express = require('express'),
      path    = require('path'),
      app     = express();

  var routes = require('./routes/index');

  var port = process.env.PORT || 3000;

  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', routes);

  app.use(function(req, res, next) {
    var err = new Error('Parece que estas perdido.');
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
