/*jslint nodejs: true*/

'use strict';

var express = require('express'),
    cors = require('cors'),
    path = require('path'),
    port = process.env.PORT || 3000,
    app = express();

/* -------------------------------------------------------------------------- */

app.get('/no-cors', function(req, res){
  res.json({
    text: 'You should not see this via a CORS request.'
  });
});

/* -------------------------------------------------------------------------- */
// options are set to allow pre flight requests
// remove it to show the difference
app.options('/simple-cors', cors());
app.get('/simple-cors', cors(), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [GET]'
  });
});
app.head('/simple-cors', cors(), function(req, res){
  res.send(204);
});
app.post('/simple-cors', cors(), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [POST]'
  });
});

// CSP  example
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
app.get('/default-csp', cors(), function(req, res){
  // res.set('Content-Security-Policy', "default-src 'self' https://maxcdn.bootstrapcdn.com")
  res.set('Content-Security-Policy', "default-src 'self'")
  res.sendFile(path.join(__dirname + '/csp.html'));
});

/* -------------------------------------------------------------------------- */

app.options('/complex-cors', cors());
app.del('/complex-cors', cors(), function(req, res){
  res.json({
    text: 'Complex CORS requests are working. [DELETE]'
  });
});

/* -------------------------------------------------------------------------- */

var issue2options = {
  origin: true,
  methods: ['POST'],
  credentials: true,
  maxAge: 3600
};
app.options('/issue-2', cors(issue2options));
app.post('/issue-2', cors(issue2options), function(req, res){
  res.json({
    text: 'Issue #2 is fixed.'
  });
});

if(!module.parent){
  app.listen(port, function(){
    console.log('Express server listening on port ' + port + '.');
  });
}
